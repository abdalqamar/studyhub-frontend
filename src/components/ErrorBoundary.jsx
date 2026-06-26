import { Component } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
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
            <div className="relative border border-dashed border-cyan-400/30 bg-slate-900/60 rounded-lg p-8 text-center">
              <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              <div className="w-14 h-14 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-slate-400 text-sm mb-7 leading-relaxed">
                An unexpected error occurred. Please try reloading the page or
                return to the homepage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReload}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-sm font-semibold rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reload
                </button>
                <Link
                  to="/"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-white font-mono text-sm rounded-md transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </div>

              {import.meta.env.DEV && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer font-mono text-xs text-slate-500 hover:text-cyan-400">
                    stack_trace (dev only)
                  </summary>
                  <pre className="mt-2 p-3 bg-slate-950 border border-slate-800 rounded text-[11px] text-red-400 overflow-auto max-h-40 font-mono">
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
