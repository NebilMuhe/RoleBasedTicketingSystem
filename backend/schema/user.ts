import { z } from 'zod';

export const userSchema = z.object({
    first_name: z.string({
        required_error: 'First Name is required',
        invalid_type_error: 'First Name must be a string',
    }).min(3, { message: 'First Name must be at least 3 characters' })
      .max(15, { message: 'First Name must be less than 15 characters' }),

    middle_name: z.string({
        required_error: 'Middle Name is required',
        invalid_type_error: 'Middle Name must be a string',
    }).min(3, { message: 'Middle Name must be at least 3 characters' })
      .max(15, { message: 'Middle Name must be less than 15 characters' }),

    last_name: z.string({
        required_error: 'Last Name is required',
        invalid_type_error: 'Last Name must be a string',
    }).min(3, { message: 'Last Name must be at least 3 characters' })
      .max(15, { message: 'Last Name must be less than 15 characters' }),

    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({ message: 'Invalid email address' }),

    phone_number: z.string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
    }).regex(/^09\d{8}$/, { message: 'Phone number must start with 09 and be exactly 10 digits' }),

    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),

    role: z.enum(['user', 'admin'])
});


export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    phone_number: z.string({
        invalid_type_error: 'Phone number must be a string',
    }).regex(/^09\d{8}$/, { message: 'Phone number must start with 09 and be exactly 10 digits' }).optional(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
}).refine(
    (data) => {
        const hasEmail = !!data.email;
        const hasPhone = !!data.phone_number;
        return (hasEmail || hasPhone) && !(hasEmail && hasPhone);
    },
    {
        message: "You must provide either an email or phone number, but not both",
        path: ["email", "phone_number"] // Show error on both fields
    }
);
