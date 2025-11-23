"use client";

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
                        <form className="form glass-card" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="label">Full Name</label>
                                <input type="text" className="input" placeholder="Enter your full name" required />
                            </div>
                            <div>
                                <label className="label">Email Address</label>
                                <input type="email" className="input" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Create a password" required />
                            </div>
                            <div>
                                <label className="label">Confirm Password</label>
                                <input type="password" className="input" placeholder="Confirm your password" required />
                            </div>
                            <button type="submit" className="btn btn-submit btn-primary">
                                <span>Create Account</span> <span>→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
