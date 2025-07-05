import { hc } from "hono/client";
import { ApiRoutes } from "../../../server/index";
import {
    QueryClient,
    useQuery,
} from "@tanstack/react-query";
import { ApiResponse } from "../types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfileFormValues } from '../types';

const getBaseUrl = () => {
    // Check if we're in production
    if (import.meta.env.PROD) {
        return ''; // Use relative URLs in production (handled by Vercel proxy)
    }
    
    // Development environment
    return 'http://localhost:3000';
};

const client = hc<ApiRoutes>(getBaseUrl());

// Export the API client for direct use
export const api = client.api;

// Create a custom QueryClient with optimized default settings
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: (failureCount, error: any) => {
                // Don't retry on 4xx errors
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                return failureCount < 3;
            },
        },
        mutations: {
            retry: 1,
        },
    },
});

// Helper function to safely parse JSON responses
export async function parseApiResponse(response: Response): Promise<ApiResponse> {
    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    try {

        const res = await response.json() as ApiResponse;
        console.log("Parsed API Response:", res);
        return res;
    } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        throw new Error('Invalid response format from API');
    }
}

export async function parseUserApiResponse(response: Response) {
    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    try {
        return await response.json();
    } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        throw new Error('Invalid response format from API');
    }
}

// User API functions
export const userApi = {
    // Get all users
    getAll: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
        const response = await api.user.$get({ query: { page, limit } });
        console.log("getAll response", response);
        return parseApiResponse(response);
    },
    // Get a single user by email
    getByEmail: async (email: string) => {
        const response = await api.user[":email"].$get({ param: { email } });
        // console.log("getByEmail response", response);
        return parseUserApiResponse(response);
    },
    // Add more API functions as needed
};

// React Query hooks with custom configuration
export function useUsers() {
    return useQuery({
        queryKey: ["allUsers"],
        queryFn: () => userApi.getAll({ page: 1, limit: 10 }),

        refetchOnWindowFocus: false,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
}
export function getUserByEmail(email: string) {
    return useQuery({
        queryKey: ["getByEmail", email],
        queryFn: ({ queryKey }) => {
            const [, email] = queryKey as [string, string];
            return userApi.getByEmail(email);
        },
        // Apply default settings that prevent auto-refetching
        refetchOnWindowFocus: false,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
}

// Utility functions to manually control refetching
export const dataControls = {
    // Force refetch users data
    refreshUsers: () => {
        return queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    totalUsers: () => {
        const queryData = queryClient.getQueryData(["allUsers"]);
        if (queryData && typeof queryData === 'object' && 'total' in queryData) {
            return (queryData as ApiResponse).total;
        }
        return 0;
    },
    // Set users data manually (useful after adding new data)
    updateUsersData: (newData: any) => {
        queryClient.setQueryData(["allUsers"], newData);
    },
    // this is used for the pagination
    loadMoreUsers: async (page: number, limit: number) => {
        const response = await userApi.getAll({ page, limit });
        queryClient.setQueryData(["allUsers"], response); // Update the cache with the new data
    },
}

export const useQueryOptions = {
    queryKey: ['currentUser'],
    queryFn: async () => {
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/api/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    },
    staleTime: 30 * 60 * 1000, // Increase to 30 minutes
    gcTime: 60 * 60 * 1000,    // Increase to 60 minutes
    retry: false
}


export function useCreateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { values: UserProfileFormValues, isEditing: boolean, email?: string }) => {
            const formattedData = {
                ...data.values,
                moveInDate: data.values.moveInDate,
                maxRent: data.values.maxRent ? Number(data.values.maxRent) : undefined,
                age: Number(data.values.age),
                desiredRoomType: data.values.desiredRoomType ? data.values.desiredRoomType.toLowerCase() : '',
                preferredLocations: data.values.preferredLocations || '',
                interests: Array.isArray(data.values.interests) ? data.values.interests : []
            };
            console.log("Formatted Data: ", formattedData);
            try {
                let response;
                if (data.isEditing && data.email) {
                    // Use PUT for updates
                    response = await api.user[":email"].$put({
                        param: { email: data.email },
                        json: formattedData
                    });
                } else {
                    // Use POST for new profiles
                    response = await api.user.$post({
                        json: formattedData
                    });
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server response:', response.status, errorText);
                    try {
                        const errorJson = JSON.parse(errorText);
                        console.error('Error details:', errorJson);
                        throw new Error(errorJson.message || `Request failed with status ${response.status}`);
                    } catch (e) {
                        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
                    }
                }

                return await response.json();
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
        },
    });
}
