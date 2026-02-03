import Link from "next/link";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

export default function PoolNotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-surface border border-border-main rounded-xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-brand text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-text-main mb-3">
            Pool Not Found
          </h1>
          <p className="text-text-secondary mb-6">
            The pool you are looking for does not exist or has been removed from the registry.
          </p>
          <Link
            href="/pool"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer"
          >
            <FaArrowLeft />
            Back to All Pools
          </Link>
        </div>
      </div>
    </div>
  );
}
