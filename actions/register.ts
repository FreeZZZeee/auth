"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByLogin } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);  

    if (!validateFields.success) {
        return { error: "Неверные учетные данные!" }
    }

    const { email, password, login } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    const existingUserbyLogin = await getUserByLogin(login);

    if (existingUser) {
        return { error: "Данный email уже используется!" }
    }

    if (existingUserbyLogin) {
        return { error: "Данный логин уже используется" }
    }

    await db.user.create({
        data: {
            login,
            email,
            password: hashedPassword
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    return { success: "Отправлено электронное письмо с подтверждением!" };
};