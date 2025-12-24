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
    membershipTier: 'Free' | 'Silver' | 'Gold';
    coins: number;
    subscriptionExpiry?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateAddress: (address: User['address']) => void;
    upgradeMembership: (tier: 'Silver' | 'Gold') => void;
    deductCoins: (amount: number) => boolean;
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

        // Check for demo credentials first
        if (email === 'test123@gmail.com' && password === '123456789') {
            const demoUser: User = {
                name: 'Demo User',
                email: 'test123@gmail.com',
                address: {
                    street: '123 Demo Street',
                    city: 'Demo City',
                    state: 'Demo State',
                    pincode: '123456',
                    phone: '1234567890'
                },
                membershipTier: 'Free',
                coins: 100, // Demo bonus
            };
            setUser(demoUser);
            localStorage.setItem('yk_current_user', JSON.stringify(demoUser));
            return true;
        }

        // Get all users
        const usersStr = localStorage.getItem('yk_users');
        const users: User[] = usersStr ? JSON.parse(usersStr) : [];

        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Ensure legacy users have default membership fields
            const userWithDefaults = {
                ...foundUser,
                membershipTier: foundUser.membershipTier || 'Free',
                coins: foundUser.coins || 0
            };
            setUser(userWithDefaults);
            localStorage.setItem('yk_current_user', JSON.stringify(userWithDefaults));
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

        const newUser: User = {
            name,
            email,
            password,
            membershipTier: 'Free',
            coins: 0
        };
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
        updateUserInStorage(updatedUser);
    };

    const upgradeMembership = (tier: 'Silver' | 'Gold') => {
        if (!user) return;

        // Calculate expiry (30 days from now)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        // Add bonus coins for upgrading? (Optional per requirements, adding generic bonus for now)
        let bonusCoins = 0;
        if (tier === 'Silver') bonusCoins = 50;
        if (tier === 'Gold') bonusCoins = 100;

        const updatedUser: User = {
            ...user,
            membershipTier: tier,
            coins: (user.coins || 0) + bonusCoins,
            subscriptionExpiry: expiryDate.toISOString()
        };

        updateUserInStorage(updatedUser);
    };

    const deductCoins = (amount: number): boolean => {
        if (!user || (user.coins || 0) < amount) return false;

        const updatedUser = {
            ...user,
            coins: user.coins - amount
        };
        updateUserInStorage(updatedUser);
        return true;
    };

    const updateUserInStorage = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('yk_current_user', JSON.stringify(updatedUser));

        // Update in "database" as well
        const usersStr = localStorage.getItem('yk_users');
        if (usersStr) {
            const users: User[] = JSON.parse(usersStr);
            const index = users.findIndex(u => u.email === updatedUser.email);
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
            upgradeMembership,
            deductCoins,
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
