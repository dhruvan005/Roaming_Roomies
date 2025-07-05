import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";
import { getUser } from "../kinde"
import { cache } from "hono/cache";

export const authRoute = new Hono()
    .get("/login", async (c) => {
        console.log("Login route hit");
        const loginUrl = await kindeClient.login(sessionManager(c));
        console.log("Redirecting to Kinde:", loginUrl.toString());
        return c.redirect(loginUrl.toString());
    })
    .get("/register", async (c) => {
        const registerUrl = await kindeClient.register(sessionManager(c));
        return c.redirect(registerUrl.toString());
    })
    .get("/callback", async (c) => {
        console.log("=== CALLBACK DEBUG ===");
        console.log("Full URL:", c.req.url);
        console.log("NODE_ENV:", process.env.NODE_ENV);
        
        try {
            const url = new URL(c.req.url);
            console.log("URL params:", url.searchParams.toString());
            
            const manager = sessionManager(c);
            await kindeClient.handleRedirectToApp(manager, url);
            
            console.log("Authentication successful");

            // Check if user is authenticated after callback
            const isAuthenticated = await kindeClient.isAuthenticated(manager);
            console.log("Is authenticated after callback:", isAuthenticated);

            if (!isAuthenticated) {
                console.log("Authentication failed - redirecting to login");
                return c.redirect('/api/login');
            }

            // Environment-aware frontend URL - UPDATE THIS PART
            const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
            const frontendUrl = isDevelopment 
                ? 'http://localhost:3001' 
                : process.env.FRONTEND_URL || 'https://roaming-roomies.vercel.app';
            
            console.log("Redirecting to:", frontendUrl);
            console.log("=== END CALLBACK DEBUG ===");
            
            // Change this line to redirect to your desired route
            return c.redirect(`${frontendUrl}/`); // This goes to the authenticated home page
        } catch (error) {
            console.error("Callback processing failed:", error);
            return c.text("Authentication failed", 500);
        }
    })
    .get("/logout", async (c) => {
        try {
            console.log("logout route hit");
            const logoutUrl = await kindeClient.logout(sessionManager(c));
            console.log("User logged out successfully");
            return c.redirect(logoutUrl.toString());
        } catch (error) {
            console.error("Logout error:", error);
            return c.text("Logout failed", 500);
        }
    })
    .get("/me", async (c) => {
        console.log("=== /me DEBUG ===");
        console.log("Cookies from header:", c.req.header('cookie'));
        
        try {
            const manager = sessionManager(c);
            const isAuthenticated = await kindeClient.isAuthenticated(manager);
            console.log("Is authenticated:", isAuthenticated);
            
            if (!isAuthenticated) {
                console.log("User not authenticated");
                return c.json({ error: "Unauthorized" }, 401);
            }

            const user = await kindeClient.getUserProfile(manager);
            console.log("User profile:", user);
            console.log("=== END /me DEBUG ===");

            // Add cache headers to prevent unnecessary requests
            c.header('Cache-Control', 'private, max-age=300');
            c.header('ETag', JSON.stringify(user).length.toString());

            return c.json({ user });
        } catch (error) {
            console.error("Authentication error:", error);
            return c.json({ error: "Authentication failed" }, 401);
        }
    });