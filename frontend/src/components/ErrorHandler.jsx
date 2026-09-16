import React from 'react';

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Something went wrong.' };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('TravelTrek UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h3>Something went wrong.</h3>
          <p>{this.state.message}</p>
          <button onClick={() => this.setState({ hasError: false, message: '' })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorHandler;