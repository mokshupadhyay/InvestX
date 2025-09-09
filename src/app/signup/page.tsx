'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SignupFormData } from '@/types';
import { TrendingUp, User, Mail, Lock, Target } from 'lucide-react';

export default function SignupPage() {
    const { signup, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const password = watch('password');

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        try {
            const success = await signup({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                risk_appetite: data.risk_appetite,
            });
            if (success) {
                router.push('/login');
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
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Start your investment journey with InvestX
                    </p>
                </div>

                {/* Signup Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                    <FormInput
                                        label="First Name"
                                        type="text"
                                        placeholder="First name"
                                        className="pl-10"
                                        error={errors.first_name?.message}
                                        {...register('first_name', {
                                            required: 'First name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'First name must be at least 2 characters',
                                            },
                                        })}
                                    />
                                </div>

                                <div className="relative">
                                    <User className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                    <FormInput
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last name"
                                        className="pl-10"
                                        {...register('last_name')}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10"
                                    error={errors.email?.message}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address',
                                        },
                                    })}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="pl-10"
                                    error={errors.password?.message}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                <FormInput
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="pl-10"
                                    error={errors.confirmPassword?.message}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: (value) =>
                                            value === password || 'Passwords do not match',
                                    })}
                                />
                            </div>

                            <div className="relative">
                                <Target className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                                <div className="pl-10">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Risk Appetite
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        {...register('risk_appetite', {
                                            required: 'Please select your risk appetite',
                                        })}
                                        defaultValue="moderate"
                                    >
                                        <option value="low">Low - Conservative investments</option>
                                        <option value="moderate">
                                            Moderate - Balanced approach
                                        </option>
                                        <option value="high">High - Aggressive growth</option>
                                    </select>
                                    {errors.risk_appetite && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.risk_appetite.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                                size="lg"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Terms */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{' '}
                        <Link href="#" className="text-blue-600 hover:text-blue-500">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-blue-600 hover:text-blue-500">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
