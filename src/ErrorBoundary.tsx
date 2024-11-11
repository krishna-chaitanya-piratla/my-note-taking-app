// src/ErrorBoundary.tsx

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call the onError prop to handle the error
    this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in the editor.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
