"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { PasswordInput } from "@/components/password-input";
import React from "react";
import { passwordSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

type Inputs = z.infer<typeof formSchema>;

export function ResetPasswordForm() {
    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const mutation = useMutation(async () => {
        return null;
    });

    async function onSubmit(data: Inputs) {}

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) =>
                    void form.handleSubmit(onSubmit)(...args)
                }
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="**********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="**********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={mutation.isLoading}>
                    {/* {isPending && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )} */}
                    Reset Password
                    <span className="sr-only">Reset password</span>
                </Button>
                {!!mutation.error && <span>Error</span>}
            </form>
        </Form>
    );
}