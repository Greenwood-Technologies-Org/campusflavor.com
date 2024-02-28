"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { emailSchema, passwordSchema } from "@/lib/validations/auth";

import { AuthError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import React from "react";
import { getBrowserClient } from "@/lib/db/db-client";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

type Inputs = z.infer<typeof formSchema>;

export function SignUpForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const dbClient = getBrowserClient();

    const mutation = useMutation(
        async (data: Inputs) => {
            const { data: resSignUp, error: errorSignUp } =
                await dbClient.auth.signUp(data);

            if (errorSignUp) {
                throw new AuthError(errorSignUp.message);
            }
        },
        { retry: false }
    );

    async function onSubmit(data: Inputs) {
        mutation.mutate(data, {
            onSuccess: () => {
                router.push(
                    `/signup/verify-email?email=${data.email}&resend=false`
                );
            },
            onError: (e: any) => {
                console.log(e);

                if (e instanceof AuthError) {
                    setErrorMessage(e.message);
                } else {
                    setErrorMessage("Unknown Error.");
                }
            },
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