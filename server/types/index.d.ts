declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        DATABASE_URL: string;
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string;
    }
}