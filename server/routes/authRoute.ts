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
        console.log("Callback route hit with URL:", c.req.url);
        try {
            const url = new URL(c.req.url);
            await kindeClient.handleRedirectToApp(sessionManager(c), url);
            console.log("Authentication successful, redirecting to frontend");

            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
            return c.redirect(frontendUrl);
        } catch (error) {
            console.error("Callback processing failed:", error);
            return c.text("Authentication failed", 500);
        }
    })
    .get("/logout", async (c) => {
        try {
            console.log("logout route hit");
            await kindeClient.logout(sessionManager(c));
            console.log("User logged out successfully");
        } catch (error) {
            
        }
        const logoutUrl = await kindeClient.logout(sessionManager(c));
        return c.redirect(logoutUrl.toString());
    })
    .get("/me", getUser, async (c) => {
        const user = c.var.user;

        // Add cache headers to prevent unnecessary requests
        c.header('Cache-Control', 'private, max-age=300'); // Cache for 5 minutes
        c.header('ETag', JSON.stringify(user).length.toString()); // Simple ETag implementation

        return c.json({ user });
    });