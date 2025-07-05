import {
    createKindeServerClient,
    GrantType,
    type SessionManager,
    type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Environment-aware configuration
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;


// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: isDevelopment
        ? 'http://localhost:3000/api/callback'
        : process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: isDevelopment
        ? 'http://localhost:3001'
        : process.env.KINDE_LOGOUT_REDIRECT_URI!,
});

// Session manager implementation with fixed cookie handling
export const sessionManager = (c: Context): SessionManager => ({
    async getSessionItem(key: string) {
        const result = getCookie(c, key);
        console.log(`Getting session item "${key}":`, result ? 'found' : 'not found');
        if (result) {
            console.log(`Session item "${key}" value:`, result.substring(0, 50) + '...');
        }
        return result;
    },
    async setSessionItem(key: string, value: unknown) {
        const cookieValue = typeof value === "string" ? value : JSON.stringify(value);
        console.log(`Setting session item "${key}":`, cookieValue.substring(0, 50) + '...');
        
        // Fixed cookie options for development
        const cookieOptions = {
            httpOnly: false, // Set to false for development to debug
            secure: false, // Must be false for localhost
            sameSite: 'lax' as const, // Use 'lax' for localhost
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/', // Ensure cookie is available for all paths
        };
        
        console.log(`Cookie options for "${key}":`, cookieOptions);
        setCookie(c, key, cookieValue, cookieOptions);
        
        // Verify the cookie was set
        setTimeout(() => {
            const verify = getCookie(c, key);
            console.log(`Cookie verification for "${key}":`, verify ? 'success' : 'failed');
        }, 100);
    },
    async removeSessionItem(key: string) {
        console.log(`Removing session item "${key}"`);
        deleteCookie(c, key, { path: '/' });
    },
    async destroySession() {
        console.log("Destroying session");
        const authCookies = ["id_token", "access_token", "user", "refresh_token", "state"];
        for (const cookie of authCookies) {
            deleteCookie(c, cookie, { path: '/' });
        }
    },
});

// Get user middleware
export const getUser = createMiddleware<{
    Variables: {
        user: UserType;
    };
}>(async (c, next) => {
    try {
        const manager = sessionManager(c);
        const isAuthenticated = await kindeClient.isAuthenticated(manager);
        
        if (!isAuthenticated) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const user = await kindeClient.getUserProfile(manager);
        c.set("user", user);
        await next();
    } catch (error) {
        console.error("Authentication error:", error);
        return c.json({ error: "Authentication failed" }, 401);
    }
});