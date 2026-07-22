import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => (
  <main className="min-h-screen bg-bg px-6 flex items-center justify-center text-center">
    <div className="max-w-md rounded-xl border border-border bg-surface p-8">
      <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-danger" />
      <h1 className="font-display text-2xl font-bold">Access denied</h1>
      <p className="mt-3 text-sm text-text-2">
        Your account does not have permission to view this page.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-bg"
      >
        Return home
      </Link>
    </div>
  </main>
);

export default Unauthorized;
