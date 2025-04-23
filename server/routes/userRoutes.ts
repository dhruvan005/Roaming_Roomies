import { Hono } from 'hono';
import { db } from '../db'; // Adjust the import path
import { roommateUsers } from '../db/schema'; // Adjust the import path
import { eq, and, or, gte, lte, sql } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { RoommateUserSchema } from '../zodSchema';
import { cloudinary } from '../config/cloudinary';
import { clearScreenDown } from 'readline';

export const userRoutes = new Hono()
    .get('/', async (c) => {
        try {
            const query = c.req.query();
            const {
                age,
                gender,
                minRent,
                maxRent,
                desiredRoomType,
                cleanlinessLevel,
                page = '1',
                limit = '10'
            } = query;

            // Parse pagination
            const pageNum = parseInt(page as string, 10);
            const limitNum = parseInt(limit as string, 10);
            const offset = (pageNum - 1) * limitNum;
            // Build dynamic filter conditions
            const whereConditions: any[] = [];
            
            if (age) whereConditions.push(eq(roommateUsers.age, Number(age)));
            if (gender) whereConditions.push(eq(roommateUsers.gender, gender as string));
            if (minRent) whereConditions.push(gte(roommateUsers.maxRent, minRent.toString()));
            if (maxRent) whereConditions.push(lte(roommateUsers.maxRent, maxRent.toString()));
            if (desiredRoomType) whereConditions.push(eq(roommateUsers.desiredRoomType, desiredRoomType as 'apartment' | 'house' | 'studio' | 'other'));
            if (cleanlinessLevel) whereConditions.push(eq(roommateUsers.cleanlinessLevel, Number(cleanlinessLevel)));
            
            const users = await db.select()
                .from(roommateUsers)
                .where(and(...whereConditions))
                .limit(limitNum)
                .offset(offset);
            console.log("Users: ", users);

            const [{ count }] = await db.select({ count: sql<number>`count(*)` })
                .from(roommateUsers)
                .where(and(...whereConditions));

            console.log("Count Result:", count);

            const total = Number(count) || 0;
            return c.json({
                success: true,
                page: pageNum,
                limit: limitNum,
                total: total,
                users: users
            });
        } catch (error) {
            return c.json({
                success: false,
                message: 'Error fetching users',
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 500);
        }
    })
    .post("/", zValidator("json", RoommateUserSchema), async (c) => {
        try {
            const requestData = await c.req.json();
            // console.log("Request Data: in Post route", requestData);

            const validatedData = RoommateUserSchema.parse({
                ...requestData,
                profileImageUrl: requestData.profileImageUrl,
            });
            // console.log("Validated Data: ", validatedData);

            const existingUser = await db
                .select()
                .from(roommateUsers)
                .where(eq(roommateUsers.email, validatedData.email))
                .limit(1);

            if (existingUser.length > 0) {
                return c.json({ success: false, message: "User with this email already exists" }, 409);
            }

            const newUser = await db
                .insert(roommateUsers)
                .values({
                    ...validatedData,
                    moveInDate: validatedData.moveInDate || null,
                    interests: validatedData.interests || [],
                    preferredLocations: validatedData.preferredLocations || "",
                    maxRent: validatedData.maxRent?.toString() || null,
                })
                .returning();
            // console.log("New User: ", newUser);
            return c.json({ success: true, message: "User created successfully", data: newUser }, 201);
        } catch (error) {
            return c.json(
                {
                    success: false,
                    message: "Error creating user",
                    error: error instanceof Error ? error.message : "Unknown error",
                },
                500
            );
        }
    })
    .get('/:email', async (c) => {
        try {
            const { email } = c.req.param();
            const [user] = await db
                .select()
                .from(roommateUsers)
                .where(eq(roommateUsers.email, email));

            if (!user) {
                return c.json({
                    success: false,
                    message: 'User not found'
                }, 404);
            }

            return c.json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return c.json({
                success: false,
                message: 'Error fetching user',
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 500);
        }
    })
    .put('/:email', zValidator("json", RoommateUserSchema), async (c) => {
        try {
            const { email } = c.req.param();
            const requestData = await c.req.json();

            const validatedData = RoommateUserSchema.parse({
                ...requestData,
                profileImageUrl: requestData.profileImageUrl,
            });

            // This query will use the email index automatically
            const existingUser = await db
                .select()
                .from(roommateUsers)
                .where(eq(roommateUsers.email, email))
                .limit(1);

            if (existingUser.length === 0) {
                return c.json({ success: false, message: "User not found" }, 404);
            }

            // Update operation will also use the email index
            const updatedUser = await db
                .update(roommateUsers)
                .set({
                    ...validatedData,
                    moveInDate: validatedData.moveInDate || null,
                    interests: validatedData.interests || [],
                    preferredLocations: validatedData.preferredLocations || "",
                    maxRent: validatedData.maxRent?.toString() || null,
                    // Update the updatedAt timestamp
                    updatedAt: new Date(),
                })
                .where(eq(roommateUsers.email, email))
                .returning();

            return c.json({ success: true, message: "User updated successfully", data: updatedUser });
        } catch (error) {
            return c.json(
                {
                    success: false,
                    message: "Error updating user",
                    error: error instanceof Error ? error.message : "Unknown error",
                },
                500
            );
        }
    });
