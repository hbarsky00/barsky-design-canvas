import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';

const StoreSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    trackPageView('/store/success', 'Purchase Success | Barsky Design');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="py-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Purchase Successful!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. You should receive an email with your download links shortly.
              </p>

              {/* Session Info */}
              {sessionId && (
                <div className="bg-muted rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground">
                    Order ID: <span className="font-mono">{sessionId}</span>
                  </p>
                </div>
              )}

              {/* Download Instructions */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    What happens next?
                  </h3>
                </div>
                <ul className="text-left space-y-2 text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Check your email for download links and instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Download your digital products from the secure links provided
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    Access to templates is immediate and lifetime
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/store" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Store
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Need Help? Contact Us
                  </Link>
                </Button>
              </div>

              {/* Support Note */}
              <p className="text-sm text-muted-foreground mt-8">
                If you don't receive your email within 10 minutes, please check your spam folder or{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  contact us
                </Link>{' '}
                for assistance.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoreSuccess;