import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex items-center justify-center p-6">
          <div className="glass-card p-6 max-w-sm w-full text-center">
            <AlertCircle className="mx-auto text-red-400 mb-4" size={40} />
            <h3 className="text-white font-medium mb-2">出现了一些问题</h3>
            <p className="text-gray-400 text-sm mb-4">
              {this.state.error?.message || '未知错误'}
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-[#fbbf24] text-black rounded-lg font-medium text-sm hover:bg-[#facc15] transition-colors"
            >
              <RefreshCw size={14} />
              重试
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
