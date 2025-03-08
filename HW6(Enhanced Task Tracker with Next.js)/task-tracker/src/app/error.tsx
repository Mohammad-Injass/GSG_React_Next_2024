"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
