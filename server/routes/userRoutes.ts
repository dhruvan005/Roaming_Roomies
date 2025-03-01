import { Hono } from "hono";


export const userRoute = new Hono()
.post("/", async (c) => {
    try {
        const { user } = await c.req.json();
        if (!user) {
            return c.json({
                success: false,
                message: "User not found"
            }, 404);
        }
        return c.json({
            success: true,
            user
        });
    } catch (error) {
        return c.json({
            success: false,
            message: "An error occurred"
        }, 500);
    }
    })
    .get("/", async (c) => {
    
        // finding all users
    
    })