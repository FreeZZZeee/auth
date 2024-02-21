"use client"

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setsuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setsuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setsuccess(data?.success);
                })
        });
    };

    return (
        <CardWrapper
            header="Смена пароля"
            headerLabel="Забыли свой пароль?"
            backButtonLabel="Назад"
            backButtonHref="/auth/login"
        >
            <Form
                {...form}
            >
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError 
                        message={error}
                    />
                    <FormSuccess 
                        message={success}
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Смена пароля
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}