import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-text mb-4">404</h1>
        <h2 className="text-3xl font-bold text-primary-text mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary-text mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-btn-primary text-white rounded-lg hover:bg-btn-primary-hover transition inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
