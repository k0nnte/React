import React from 'react';
import { ErrorBoundaryProps } from '../interfases';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { hasError: boolean; error: Error | null } = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary catch', error, errorInfo);
  }

  clickReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorboundary">
          <h2>Ой ошибка. Перезагрузим?</h2>
          <button onClick={this.clickReset} className="btn_error">
            Перезагрузить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
