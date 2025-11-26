"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const redirectPath = searchParams.get('redirect') || '/';
    const signupLink = redirectPath !== '/' ? `/signup?redirect=${encodeURIComponent(redirectPath)}` : '/signup';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                showToast("Welcome back!", "success");
                router.push(redirectPath);
            } else {
                showToast("Invalid email or password", "error");
            }
        } catch (error) {
            showToast("Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <section className="page-hero signup-hero">
                <div className="container">
                    <h1 className="title">Login to Your Account</h1>
                    <p className="lead">Welcome back! Sign in to continue shopping with YourKirana.</p>
                </div>
            </section>

            <section className="section signup-section">
                <div className="container">
                    <div className="signup-card">
                        <form className="form glass-card" onSubmit={handleSubmit}>
                            <div>
                                <label className="label">Email Address</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-submit btn-primary"
                                disabled={isLoading}
                            >
                                <span>{isLoading ? "Logging in..." : "Login"}</span>
                                {!isLoading && <span>→</span>}
                            </button>
                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <Link href={signupLink} className="text-sm text-primary hover:underline">
                                    Don&apos;t have an account? Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
