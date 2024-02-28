import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    })),
    newPassword: z.optional(z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    }))
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "Требуется новый пароль!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Требуется пароль!",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
});


export const LoginSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
    password: z.string().min(1, {
        message: "Требуется пароль"
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Требуется email" }),
    password: z.string().min(6, {
        message: "Минимальная длинна пароля 6 символов"
    }),
    login: z.string().min(1, {
        message: "Требуется логин"
    })
});