import { Component } from "react";
import { StatusMessage } from "../status-message/StatusMessage";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <StatusMessage tone="error" title="Something went wrong.">
          Reload the page or restart the local API server if the issue
          persists.
        </StatusMessage>
      );
    }

    return this.props.children;
  }
}
