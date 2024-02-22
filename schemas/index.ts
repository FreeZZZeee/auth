import * as z from "zod";

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
    })
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