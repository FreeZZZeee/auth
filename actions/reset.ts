"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (
    values: z.infer<typeof ResetSchema>
) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Неправильная электронная почта!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Электронная почта не найдена!" };
    }

    return { success: "Ccылка для смены пароля отправлена!" };
}