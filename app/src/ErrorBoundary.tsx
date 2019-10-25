import * as React from 'react';
import { Typography } from '@material-ui/core';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError)
      return (
        <Typography variant="h5" component="h2">
          There was an error. Please reload page.
        </Typography>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
