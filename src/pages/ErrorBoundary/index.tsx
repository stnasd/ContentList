import { NavLink } from "react-router-dom";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <div className="error-container">
            <div className="error-title">
              Произошла непредвиденная ошибка. Попробуйте обновить страницу
              через некоторое время.
            </div>
            <NavLink to={"/"} className="back-button">
              Вернуться на главную
            </NavLink>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
