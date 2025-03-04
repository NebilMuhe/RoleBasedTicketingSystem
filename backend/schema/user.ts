import { z } from 'zod';

export const userSchema = z.object({
    FirstName: z.string({
        required_error: 'First Name is required',
        invalid_type_error: 'First Name must be a string',
    }).min(3, { message: 'First Name must be at least 3 characters' })
      .max(15, { message: 'First Name must be less than 15 characters' }),

    MiddleName: z.string({
        required_error: 'Middle Name is required',
        invalid_type_error: 'Middle Name must be a string',
    }).min(3, { message: 'Middle Name must be at least 3 characters' })
      .max(15, { message: 'Middle Name must be less than 15 characters' }),

    LastName: z.string({
        required_error: 'Last Name is required',
        invalid_type_error: 'Last Name must be a string',
    }).min(3, { message: 'Last Name must be at least 3 characters' })
      .max(15, { message: 'Last Name must be less than 15 characters' }),

    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({ message: 'Invalid email address' }),

    PhoneNumber: z.string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
    }).regex(/^09\d{8}$/, { message: 'Phone number must start with 09 and be exactly 10 digits' }),

    Password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),

    Role: z.enum(['user', 'admin'])
});
