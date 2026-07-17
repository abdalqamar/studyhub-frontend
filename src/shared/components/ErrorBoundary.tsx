import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6 relative overflow-hidden">
          {/*  backdrop */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 w-full max-w-md">
            <div className="relative border border-dashed border-gold/30 bg-surface/60 rounded-lg p-8 text-center">
              <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-gold" />
              <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-gold" />
              <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-gold" />
              <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-gold" />

              <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-6 h-6 text-gold" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-text-2 text-sm mb-7 leading-relaxed">
                An unexpected error occurred. Please try reloading the page or
                return to the homepage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReload}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gold hover:bg-cyan-300 text-bg font-mono text-sm font-semibold rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reload
                </button>
                <Link
                  to="/"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border hover:border-gold/50 text-text-2 hover:text-white font-mono text-sm rounded-md transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </div>

              {import.meta.env.DEV && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer font-mono text-xs text-text-3 hover:text-gold">
                    stack_trace (dev only)
                  </summary>
                  <pre className="mt-2 p-3 bg-bg border border-border rounded text-[11px] text-red-400 overflow-auto max-h-40 font-mono">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
