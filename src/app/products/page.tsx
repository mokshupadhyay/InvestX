'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { productsAPI } from '@/lib/api';
import {
    formatCurrency,
    getRiskLevelColor,
    getInvestmentTypeColor,
} from '@/lib/utils';
import { InvestmentProduct } from '@/types';
import {
    Search,
    Filter,
    TrendingUp,
    Calendar,
    Target,
    DollarSign,
} from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
    const [products, setProducts] = useState<InvestmentProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<InvestmentProduct[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedRisk, setSelectedRisk] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('annual_yield');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await productsAPI.getProducts({ sort_by: sortBy });
                setProducts(response.data.products || []);
                setFilteredProducts(response.data.products || []);
            } catch (error: any) {
                console.error('Products fetch error:', error);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sortBy]);

    // Filter and search products
    useEffect(() => {
        let filtered = products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType =
                !selectedType || product.investment_type === selectedType;
            const matchesRisk = !selectedRisk || product.risk_level === selectedRisk;

            return matchesSearch && matchesType && matchesRisk;
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedType, selectedRisk]);

    const investmentTypes = [
        { value: '', label: 'All Types' },
        { value: 'bond', label: 'Bonds' },
        { value: 'fd', label: 'Fixed Deposits' },
        { value: 'mf', label: 'Mutual Funds' },
        { value: 'etf', label: 'ETFs' },
    ];

    const riskLevels = [
        { value: '', label: 'All Risk Levels' },
        { value: 'low', label: 'Low Risk' },
        { value: 'moderate', label: 'Moderate Risk' },
        { value: 'high', label: 'High Risk' },
    ];

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
                            Investment Products
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Discover investment opportunities tailored to your goals
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Filters */}
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Investment Type Filter */}
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {investmentTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Risk Level Filter */}
                                <select
                                    value={selectedRisk}
                                    onChange={(e) => setSelectedRisk(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {riskLevels.map((risk) => (
                                        <option key={risk.value} value={risk.value}>
                                            {risk.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Sort By */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="annual_yield">Sort by Yield</option>
                                    <option value="tenure_months">Sort by Tenure</option>
                                    <option value="min_investment">Sort by Min Investment</option>
                                    <option value="created_at">Sort by Latest</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your filters or search terms
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="hover:shadow-lg transition-shadow"
                                >
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{product.name}</CardTitle>
                                            <div className="flex flex-col gap-2">
                                                <Badge
                                                    className={getInvestmentTypeColor(
                                                        product.investment_type
                                                    )}
                                                >
                                                    {product.investment_type.toUpperCase()}
                                                </Badge>
                                                <Badge
                                                    className={getRiskLevelColor(product.risk_level)}
                                                >
                                                    {product.risk_level} risk
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Key Metrics */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                                    <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                                    <p className="text-xl font-bold text-green-600">
                                                        {product.annual_yield}%
                                                    </p>
                                                    <p className="text-xs text-gray-600">Annual Yield</p>
                                                </div>
                                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                                    <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                                    <p className="text-xl font-bold text-blue-600">
                                                        {product.tenure_months}
                                                    </p>
                                                    <p className="text-xs text-gray-600">Months</p>
                                                </div>
                                            </div>

                                            {/* Investment Range */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">
                                                        Min Investment:
                                                    </span>
                                                    <span className="font-semibold">
                                                        {formatCurrency(product.min_investment)}
                                                    </span>
                                                </div>
                                                {product.max_investment && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600">
                                                            Max Investment:
                                                        </span>
                                                        <span className="font-semibold">
                                                            {formatCurrency(product.max_investment)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {product.description && (
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}

                                            {/* Action Button */}
                                            <Link href={`/products/${product.id}`}>
                                                <Button className="w-full">
                                                    <DollarSign className="h-4 w-4 mr-2" />
                                                    Invest Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
