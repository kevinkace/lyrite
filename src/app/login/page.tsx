"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import Hr from "@/components/hr/Hr";

import { LogoIcon } from "@/components/icons/LogoIcon.svg";
import { GoogleG } from "@/components/icons/providers/google-g.svg";
import { FacebookF } from "@/components/icons/providers/facebook-f.svg";
import { MicrosoftIcon } from "@/components/icons/providers/microsoft-icon.svg";
import { GithubIcon } from "@/components/icons/providers/github-icon.svg";

import css from "./page.module.css";

const emailReg = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

const loginProviders = [
    { name: "GitHub", icon: <GithubIcon />, provider: "github" as const },
    { name: "Google", icon: <GoogleG />, provider: "google" as const },
    { name: "Facebook", icon: <FacebookF />, provider: "facebook" as const },
    { name: "Microsoft", icon: <MicrosoftIcon />, provider: "azure" as const },
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, signInWithProvider } = useAuth();
    const router = useRouter();

    if (user) {
        router.replace("/");
    }

    const handleLogin = async (provider: 'github' | 'google' | 'facebook' | 'azure') => {
        setLoading(true);
        setError(null);

        const { error } = await signInWithProvider(provider);
        if (error) setError(error.message);

        setLoading(false);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Basic email validation regex
        const valid = emailReg.test(value);
        setIsValidEmail(valid);
    };

    const handleEmailSubmit = () => {
        if (!isValidEmail) return;
        console.log("Submitting email:", email);
        // TODO: handle email sign-in logic
    };

    return (
        <Layout header={false} bg="mesh" justifyContent="center">
            <Flex direction="column" gap="6" align="center" justify="center" className={css.container}>
                <Link href="/" aria-label="Go to homepage">
                    <LogoIcon className={css.logo} />
                </Link>

                <Card className={css.providerCard} size="4">
                    <Flex direction="column" gap="3" align="center">
                        Sign in with
                        {loginProviders.map((provider) => (
                            <Button
                                key={provider.name}
                                onClick={() => handleLogin(provider.provider)}
                                size="4"
                                color="gray"
                                className={css.providerButton}
                                variant="soft"
                                disabled={loading}
                            >
                                {provider.icon}
                                {provider.name}
                            </Button>
                        ))}

                        <Hr className={css.hr}>or</Hr>

                        <TextField.Root
                            placeholder="enter your email address"
                            size="3"
                            className={css.emailInput}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <Button
                            size="3"
                            className={css.loginButton}
                            disabled={!isValidEmail || loading}
                            onClick={handleEmailSubmit}
                        >
                            Continue with Email
                        </Button>
                    </Flex>
                </Card>
            </Flex>
        </Layout>
    );
}
