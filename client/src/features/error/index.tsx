import { Link } from "react-router-dom";

function NotFoundScreen() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground">
          Oops, the page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundScreen;
