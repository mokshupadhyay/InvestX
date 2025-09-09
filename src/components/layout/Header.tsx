'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, TrendingUp } from 'lucide-react';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        href={isAuthenticated ? '/dashboard' : '/'}
                        className="flex items-center space-x-2"
                    >
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">InvestX</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Explore
                                </Link>
                                <Link
                                    href="/investments"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    My Investments
                                </Link>

                                {/* User Menu */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">
                                            {user?.first_name}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={logout}
                                        className="text-gray-500 hover:text-red-600"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
