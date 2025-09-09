'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LoginFormData } from '@/types';
import { TrendingUp, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const success = await login(data.email, data.password);
            if (success) {
                router.push('/dashboard');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuthenticated) {
        return null; // Will redirect to dashboard
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center space-x-2 mb-6"
                    >
                        <TrendingUp className="h-10 w-10 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">InvestX</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your account to continue investing
                    </p>
                </div>

                {/* Login Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please enter a valid email address',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-10"
                                        {...register('password', {
                                            required: 'Password is required',
                                        })}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                                size="lg"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                        Demo Credentials
                    </h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <p>
                            <strong>Email:</strong> alice@example.com
                        </p>
                        <p>
                            <strong>Password:</strong> password123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
