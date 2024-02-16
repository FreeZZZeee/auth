"use server"

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);  

    if (!validateFields.success) {
        return { error: "Неверные учетные данные!" }
    }

    const { email, password, login } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Данный email уже используется!" }
    }

    await db.user.create({
        data: {
            login,
            email,
            password: hashedPassword
        },
    });

    // TODO: Send verification token email

    return { success: "Учетная запись успешно создана!" };
};