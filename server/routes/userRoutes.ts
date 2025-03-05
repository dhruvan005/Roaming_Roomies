import { Hono } from 'hono';
import { db } from '../db'; // Adjust the import path
import { roommateUsers } from '../db/schema'; // Adjust the import path
import { eq, and, or, gte, lte, sql } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { RoommateUserSchema } from '../schema';

const userRoutes = new Hono();

/**
 * GET all users with advanced filtering
 */
userRoutes.get('/', async (c) => {
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
        if (gender) whereConditions.push(eq(roommateUsers.gender, gender as 'male' | 'female' | 'non_binary' | 'other' | 'prefer_not_to_say'));
        if (minRent) whereConditions.push(gte(roommateUsers.maxRent, minRent.toString())); // Convert minRent to string
        if (maxRent) whereConditions.push(lte(roommateUsers.maxRent, maxRent.toString())); // Convert maxRent to string
        if (desiredRoomType) whereConditions.push(eq(roommateUsers.desiredRoomType, desiredRoomType as 'apartment' | 'house' | 'studio' | 'other'));
        if (cleanlinessLevel) whereConditions.push(eq(roommateUsers.cleanlinessLevel, Number(cleanlinessLevel)));

        // Fetch users with filtering and pagination
        const users = await db.select()
            .from(roommateUsers)
            .where(and(...whereConditions))
            .limit(limitNum)
            .offset(offset);

        // Count total matching users
        const [{ count }] = await db.select({ count: sql<number>`count(*)` })
            .from(roommateUsers)
            .where(and(...whereConditions));

        return c.json({
            success: true,
            page: pageNum,
            limit: limitNum,
            total: count,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return c.json({
            success: false,
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
});

/**
 * POST new user with validation
 */
userRoutes.post(
    '/',
    zValidator('json', RoommateUserSchema),
    async (c) => {
        try {
            const requestData = await c.req.json();
            
            // Convert moveInDate to Date object if it exists
            if (requestData.moveInDate && typeof requestData.moveInDate === 'string') {
                requestData.moveInDate = new Date(requestData.moveInDate);
            }
            
            const validatedData = RoommateUserSchema.parse(requestData);

            // Check if email already exists
            const existingUser = await db
                .select()
                .from(roommateUsers)
                .where(eq(roommateUsers.email, validatedData.email))
                .limit(1);

            if (existingUser.length > 0) {
                return c.json({
                    success: false,
                    message: 'User with this email already exists'
                }, 409);
            }

            // Insert new user
            const [newUser] = await db.insert(roommateUsers)
                .values({
                    ...validatedData,
                    // Convert date to PostgreSQL date format if exists
                    moveInDate: validatedData.moveInDate
                        ? new Date(validatedData.moveInDate).toISOString()
                        : null,
                    // Convert optional arrays and objects to PostgreSQL compatible format
                    interests: validatedData.interests || [],
                    preferredLocations: validatedData.preferredLocations || [],
                    personalityTraits: validatedData.personalityTraits
                        ? JSON.stringify(validatedData.personalityTraits)
                        : null,
                    maxRent: validatedData.maxRent?.toString() || null // Convert maxRent to string
                })
                .returning();

            return c.json({
                success: true,
                message: 'User created successfully',
                data: newUser
            }, 201);
        } catch (error) {
            console.error('Detailed Error:', error);
            return c.json({
                success: false,
                message: 'Error creating user',
                error: error instanceof Error ? error.message : 'Unknown error'
            }, 500);
        }
    }
);

/**
 * GET user by ID
 */
userRoutes.get('/:id', async (c) => {
    try {
        const { id } = c.req.param();

        const [user] = await db
            .select()
            .from(roommateUsers)
            .where(eq(roommateUsers.id, id));

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
});



/**
 * PUT (Update) user by ID
 */
// userRoutes.put(
//     '/:id',
//     zValidator('json', RoommateUserSchema.partial()),
//     async (c) => {
//         try {
//             const { id } = c.req.param();
//             const validatedData = c.req.valid('json');

//             // Update user
//             const [updatedUser] = await db.update(roommateUsers)
//                 .set({
//                     ...validatedData,
//                     updatedAt: new Date().toISOString(),
//                     // Convert optional fields
//                     moveInDate: validatedData.moveInDate
//                         ? new Date(validatedData.moveInDate).toISOString()
//                         : undefined,
//                     interests: validatedData.interests,
//                     preferredLocations: validatedData.preferredLocations,
//                     personalityTraits: validatedData.personalityTraits
//                         ? JSON.stringify(validatedData.personalityTraits)
//                         : undefined
//                 })
//                 .where(eq(roommateUsers.id, id))
//                 .returning();

//             if (!updatedUser) {
//                 return c.json({
//                     success: false,
//                     message: 'User not found'
//                 }, 404);
//             }

//             return c.json({
//                 success: true,
//                 message: 'User updated successfully',
//                 data: updatedUser
//             });
//         } catch (error) {
//             console.error('Error updating user:', error);
//             return c.json({
//                 success: false,
//                 message: 'Error updating user',
//                 error: error instanceof Error ? error.message : 'Unknown error'
//             }, 500);
//         }
//     }
// );

/**
 * DELETE user by ID
 */
// userRoutes.delete('/:id', async (c) => {
//     try {
//         const { id } = c.req.param();

//         const [deletedUser] = await db.delete(roommateUsers)
//             .where(eq(roommateUsers.id, id))
//             .returning();

//         if (!deletedUser) {
//             return c.json({
//                 success: false,
//                 message: 'User not found'
//             }, 404);
//         }

//         return c.json({
//             success: true,
//             message: 'User deleted successfully',
//             data: deletedUser
//         });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         return c.json({
//             success: false,
//             message: 'Error deleting user',
//             error: error instanceof Error ? error.message : 'Unknown error'
//         }, 500);
//     }
// });

export default userRoutes;