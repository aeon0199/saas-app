"use client";

import { useState } from "react";

export default function PingButton() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleClick = async () => {
    if (!apiUrl) {
      setError("API URL is not configured.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
        type="button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "..." : "Call AWS API"}
      </button>
      <div className="w-full rounded-lg border border-dashed border-black/[.08] dark:border-white/[.145] bg-white/70 dark:bg-black/30 p-4 text-sm">
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        {!error && result && (
          <pre className="whitespace-pre-wrap break-words">{result}</pre>
        )}
        {!error && !result && !loading && (
          <p className="text-zinc-500 dark:text-zinc-400">No response yet.</p>
        )}
      </div>
    </div>
  );
}
