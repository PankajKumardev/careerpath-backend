const { z } = require('zod');

const registerSchema = z.object({
    username: z.string().min(3).max(30),
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const updateProfileSchema = z.object({
    name: z.string().optional(),
    profilePicture: z.string().optional(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
};
