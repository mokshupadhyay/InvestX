'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { investmentsAPI, productsAPI } from '@/lib/api';
import {
    formatCurrency,
    formatDate,
    getRiskLevelColor,
    getInvestmentTypeColor,
} from '@/lib/utils';
import { Investment, PortfolioSummary, InvestmentProduct } from '@/types';
import {
    TrendingUp,
    Wallet,
    Target,
    Activity,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [portfolioSummary, setPortfolioSummary] =
        useState<PortfolioSummary | null>(null);
    const [recommendations, setRecommendations] = useState<InvestmentProduct[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch investments and recommendations in parallel
                const [investmentsResponse, recommendationsResponse] =
                    await Promise.all([
                        investmentsAPI.getInvestments(),
                        productsAPI.getRecommendations(),
                    ]);

                setInvestments(investmentsResponse.data.investments || []);
                setPortfolioSummary(investmentsResponse.data.portfolio_summary);
                setRecommendations(recommendationsResponse.data.recommendations || []);
            } catch (error: any) {
                console.error('Dashboard data fetch error:', error);
                setError('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {user?.first_name}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's an overview of your investment portfolio
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Portfolio Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">
                                            Total Invested
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(portfolioSummary?.total_invested || 0)}
                                        </p>
                                    </div>
                                    <Wallet className="h-8 w-8 text-blue-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">
                                            Expected Returns
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(
                                                portfolioSummary?.total_expected_return || 0
                                            )}
                                        </p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm font-medium">
                                            Total Gains
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {formatCurrency(portfolioSummary?.total_gain || 0)}
                                        </p>
                                        <div className="flex items-center mt-1">
                                            <ArrowUpRight className="h-4 w-4 text-purple-200" />
                                            <span className="text-xs text-purple-200">
                                                {portfolioSummary?.total_invested &&
                                                    portfolioSummary.total_invested > 0
                                                    ? (
                                                        (portfolioSummary.total_gain /
                                                            portfolioSummary.total_invested) *
                                                        100
                                                    ).toFixed(1)
                                                    : 0}
                                                % returns
                                            </span>
                                        </div>
                                    </div>
                                    <Target className="h-8 w-8 text-purple-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-100 text-sm font-medium">
                                            Active Investments
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {portfolioSummary?.active_investments || 0}
                                        </p>
                                    </div>
                                    <Activity className="h-8 w-8 text-orange-200" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Investments */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Activity className="h-5 w-5" />
                                        <span>Recent Investments</span>
                                    </CardTitle>
                                    <Link href="/investments">
                                        <Button variant="outline" size="sm">
                                            View All
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    {investments.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                No investments yet
                                            </h3>
                                            <p className="text-gray-500 mb-4">
                                                Start your investment journey today
                                            </p>
                                            <Link href="/products">
                                                <Button>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Explore Products
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {investments.slice(0, 5).map((investment) => (
                                                <div
                                                    key={investment.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900">
                                                                    {investment.product_name}
                                                                </h4>
                                                                <div className="flex items-center space-x-2 mt-1">
                                                                    <Badge
                                                                        className={getInvestmentTypeColor(
                                                                            investment.investment_type
                                                                        )}
                                                                    >
                                                                        {investment.investment_type.toUpperCase()}
                                                                    </Badge>
                                                                    <Badge
                                                                        className={getRiskLevelColor(
                                                                            investment.risk_level
                                                                        )}
                                                                    >
                                                                        {investment.risk_level}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">
                                                            {formatCurrency(investment.amount)}
                                                        </p>
                                                        <p className="text-sm text-gray-500 flex items-center">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {formatDate(investment.invested_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recommendations */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Target className="h-5 w-5" />
                                        <span>Recommended for You</span>
                                    </CardTitle>
                                    <p className="text-sm text-gray-600">
                                        Based on your {user?.risk_appetite} risk appetite
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {recommendations.length === 0 ? (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500 text-sm">
                                                No recommendations available
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {recommendations.slice(0, 3).map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium text-gray-900 text-sm">
                                                            {product.name}
                                                        </h4>
                                                        <Badge
                                                            className={getInvestmentTypeColor(
                                                                product.investment_type
                                                            )}
                                                        >
                                                            {product.investment_type.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-lg font-bold text-green-600">
                                                                {product.annual_yield}%
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {product.tenure_months} months
                                                            </p>
                                                        </div>
                                                        <Link href={`/products/${product.id}`}>
                                                            <Button size="sm" variant="outline">
                                                                Invest
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <Link href="/products">
                                            <Button variant="outline" className="w-full" size="sm">
                                                View All Products
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
