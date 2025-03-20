import { hc } from "hono/client";
import { ApiRoutes } from "../../../server/index";
import {
    QueryClient,
    useQuery,
    QueryKey,
    QueryOptions
} from "@tanstack/react-query";
import { ApiResponse } from "../types";
import { createRouter } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfileFormValues } from '../types';
// Create a typed Hono client
// Make sure the base URL is correct for your API
const client = hc<ApiRoutes>("/");

// Export the API client for direct use
export const api = client.api;

// Create a custom QueryClient with optimized default settings
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Disable automatic refetching on window focus
            refetchOnWindowFocus: false,

            // Keep data fresh for 5 minutes before marking it as stale
            staleTime: 5 * 60 * 1000,

            // Keep cached data for 30 minutes before garbage collection
            gcTime: 30 * 60 * 1000,

            // Disable polling/refetching at intervals
            refetchInterval: false,

            // Still refetch on reconnect (when internet connection returns)
            refetchOnReconnect: true,

            // Retry failed requests 1 time
            retry: 2,
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
        return await response.json() as ApiResponse;
    } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        throw new Error('Invalid response format from API');
    }
}

// User API functions
export const userApi = {
    // Get all users
    getAll: async () => {
        const response = await api.user.$get();
        return parseApiResponse(response);
    },
    loadMore: async () => {
        const response = await api.user.$get({ query: { page: 2 } }); // Example query parameter for pagination
        return parseApiResponse(response);
    },


    // Add more API functions as needed
};

// React Query hooks with custom configuration
export function useUsers() {
    return useQuery({
        queryKey: ["allUsers"],
        queryFn: userApi.getAll,
        // Apply default settings that prevent auto-refetching
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Override with any custom options
    });
}

// Utility functions to manually control refetching
export const dataControls = {
    // Force refetch users data
    refreshUsers: () => {
        return queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },

    // Set users data manually (useful after adding new data)
    updateUsersData: (newData: any) => {
        queryClient.setQueryData(["allUsers"], newData);
    },
    loadMoreUsers: userApi.loadMore,
};

export const useQueryOptions = {
    queryKey: ['currentUser'],
    queryFn: async () => {
        const response = await api.me.$get();
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    },
    staleTime: Infinity,
    retry: false
};
export function useCreateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserProfileFormValues) => {
            const formattedData = {
                ...data,
                moveInDate: data.moveInDate,
                maxRent: data.maxRent ? Number(data.maxRent) : undefined,
                age: Number(data.age)
            };

            // console.log("Formatted data being sent:", JSON.stringify(formattedData, null, 2));

            try {
                // Use fetch directly for more debugging control
                const response = await api.user.$post({
                    json: formattedData

                });

                if (!response.ok) {
                    const errorText = await response.text();
                    // console.error('Server response:', response.status, errorText);
                    try {
                        const errorJson = JSON.parse(errorText);
                        // console.error('Error details:', errorJson);
                        throw new Error(errorJson.message || `Request failed with status ${response.status}`);
                    } catch (e) {
                        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
                    }
                }

                return await response.json();
            } catch (error) {
                // console.error('Request error:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
        },
    });
}