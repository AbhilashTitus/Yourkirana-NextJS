"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    name: string;
    email: string;
    password?: string; 
    address?: {
        street: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
    };
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateAddress: (address: User['address']) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Load user from session storage on mount
    useEffect(() => {
        const sessionUser = localStorage.getItem('yk_current_user');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get all users
        const usersStr = localStorage.getItem('yk_users');
        const users: User[] = usersStr ? JSON.parse(usersStr) : [];

        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('yk_current_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get all users
        const usersStr = localStorage.getItem('yk_users');
        const users: User[] = usersStr ? JSON.parse(usersStr) : [];

        // Check if user exists
        if (users.some(u => u.email === email)) {
            return false; // User already exists
        }

        const newUser: User = { name, email, password };
        users.push(newUser);

        // Save to "database"
        localStorage.setItem('yk_users', JSON.stringify(users));

        // Auto login
        setUser(newUser);
        localStorage.setItem('yk_current_user', JSON.stringify(newUser));

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('yk_current_user');
        router.push('/login');
    };

    const updateAddress = (address: User['address']) => {
        if (!user) return;

        const updatedUser = { ...user, address };
        setUser(updatedUser);
        localStorage.setItem('yk_current_user', JSON.stringify(updatedUser));

        // Update in "database" as well
        const usersStr = localStorage.getItem('yk_users');
        if (usersStr) {
            const users: User[] = JSON.parse(usersStr);
            const index = users.findIndex(u => u.email === user.email);
            if (index !== -1) {
                users[index] = updatedUser;
                localStorage.setItem('yk_users', JSON.stringify(users));
            }
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            updateAddress,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
