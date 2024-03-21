import { ErrorComponent, type ErrorRouteProps } from '@tanstack/react-router';
import { AuthenticationError } from '@errors/authenticationError.ts';

export default function RouteErrorComponent({ error }: ErrorRouteProps) {
  if (error instanceof AuthenticationError) {
    return (
      <div style={{ color: 'red' }}>
        <h3>Authentication Error: {error.message}</h3>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div style={{ color: 'red' }}>
        <h3>Error: {error.message}</h3>
      </div>
    );
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const errorMessage = error.message;
    if (typeof errorMessage === 'string') {
      return (
        <div style={{ color: 'red' }}>
          <h3>{errorMessage}</h3>
        </div>
      );
    }
  }
  return <ErrorComponent error={error} />;
}
