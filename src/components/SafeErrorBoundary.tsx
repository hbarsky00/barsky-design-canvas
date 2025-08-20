import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

export class SafeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    retryCount: 0
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('SafeErrorBoundary caught error:', error);
    return { hasError: true, error, retryCount: 0 };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SafeErrorBoundary detailed error:', error, errorInfo);
    
    // Handle React hook errors specifically
    if (error.message.includes('useEffect') || error.message.includes('Cannot read properties of null')) {
      console.log('🚨 React hook error detected - clearing caches with reload guard');

      // Prevent reload loops: only allow one reload every 10 seconds
      const now = Date.now();
      const lastReload = Number(sessionStorage.getItem('last_reload_ts') || '0');
      if (now - lastReload < 10000) {
        console.warn('Skipping auto-reload to avoid loop');
        return;
      }
      sessionStorage.setItem('last_reload_ts', String(now));
      
      // Clear all local/session storage
      try { localStorage.clear(); } catch {}
      try { sessionStorage.clear(); } catch {}
      
      // Clear service worker caches
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.unregister());
        });
      }
      
      // Force page reload after short delay
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined,
      retryCount: this.state.retryCount + 1 
    });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4 font-display">
              Application Error
            </h2>
            <p className="text-muted-foreground mb-6">
              Something went wrong. The application will refresh automatically.
            </p>
            <div className="space-y-2">
              <button
                onClick={this.handleRetry}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again ({this.state.retryCount}/3)
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}