'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Target, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <TrendingUp className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Investing Made
              <span className="text-blue-600"> Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover personalized investment opportunities in bonds, fixed
              deposits, mutual funds, and ETFs. Start building your wealth with
              InvestX today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Investing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Login to Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose InvestX?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for modern investors who want intelligent, personalized
              investment solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600">
                Get investment suggestions tailored to your risk appetite and
                financial goals.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your investments are protected with bank-level security and
                transparency.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Access curated investment products from trusted financial
                institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Investment Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose from a variety of investment products to diversify your
              portfolio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">B</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Government Bonds
              </h3>
              <p className="text-sm text-gray-600">
                Safe, government-backed investments with steady returns.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="bg-green-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">FD</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Fixed Deposits
              </h3>
              <p className="text-sm text-gray-600">
                Guaranteed returns with flexible tenure options.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="bg-purple-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">MF</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mutual Funds</h3>
              <p className="text-sm text-gray-600">
                Diversified portfolios managed by investment experts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="bg-orange-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold">ETF</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ETFs</h3>
              <p className="text-sm text-gray-600">
                Exchange-traded funds for broad market exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investors who trust InvestX for their financial
            goals.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
