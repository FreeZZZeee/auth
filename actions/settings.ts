"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { unstable_update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Неавторизованный" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Неавторизованный" };
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Такая электронная почта уже зарегистриована" }
        }

        const verificationToken = await generateVerificationToken(
            values.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Отправлено электронное письмо с подтверждением!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        );

        if (!passwordMatch) {
            return { error: "Неправильный пароль!" }
        }

        const hashedPassword = await bcrypt.hash(
            values.newPassword,
            10
        );

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    unstable_update({
        user: {
            name:updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role
        }
    });

    return { success: "Настройки обновлены" };
}