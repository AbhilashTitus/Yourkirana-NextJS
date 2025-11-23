"use client";

export default function LoginPage() {
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
                        <form className="form glass-card" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="label">Email Address</label>
                                <input type="email" className="input" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Enter your password" required />
                            </div>
                            <button type="submit" className="btn btn-submit btn-primary">
                                <span>Login</span> <span>→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
