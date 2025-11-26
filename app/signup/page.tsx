"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const redirectPath = searchParams.get('redirect') || '/';
    const loginLink = redirectPath !== '/' ? `/login?redirect=${encodeURIComponent(redirectPath)}` : '/login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        setIsLoading(true);

        try {
            const success = await signup(name, email, password);
            if (success) {
                showToast("Account created successfully!", "success");
                router.push(redirectPath);
            } else {
                showToast("Email already exists", "error");
            }
        } catch (error) {
            showToast("Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="form glass-card" onSubmit={handleSubmit}>
            <div>
                <label className="label">Full Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
                    placeholder="Create a password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label className="label">Confirm Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-submit btn-primary"
                disabled={isLoading}
            >
                <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
                {!isLoading && <span>→</span>}
            </button>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <Link href={loginLink} className="text-sm text-primary hover:underline">
                    Already have an account? Login
                </Link>
            </div>
        </form>
    );
}

export default function SignupPage() {
    return (
        <main>
            <section className="page-hero signup-hero">
                <div className="container">
                    <h1 className="title">Create Your Account</h1>
                    <p className="lead">Join YourKirana and shop smarter with your local stores.</p>
                </div>
            </section>

            <section className="section signup-section">
                <div className="container">
                    <div className="signup-card">
                        <Suspense fallback={<div className="glass-card p-8 text-center">Loading signup form...</div>}>
                            <SignupForm />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    );
}
