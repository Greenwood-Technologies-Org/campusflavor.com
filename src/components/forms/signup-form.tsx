"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    emailSchema,
    passwordSchema,
    usernameSchema,
} from "@/lib/validations/auth";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
});

type Inputs = z.infer<typeof formSchema>;

export function SignUpForm() {
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const router = useRouter();

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const mutation = useMutation(async (data: Inputs) => {}, { retry: false });

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: () => {},
            onError: (e: any) => {},
        });
    }

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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="someone@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
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
                    {mutation.isLoading && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Continue
                    <span className="sr-only">
                        Continue to email verification page
                    </span>
                </Button>
                {mutation.isError && <span>{errorMessage}</span>}
            </form>
        </Form>
    );
}
