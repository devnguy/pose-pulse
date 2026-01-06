"use client"; // Error boundaries must be Client Components

// This is just the default ErrorBoundary example given by nextjs
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { dispatch } = useDrawingSessionContext();

  useEffect(() => {
    console.error(error);
    dispatch({ type: "CLEAR_ERROR" });

    // TODO: Just redirecting back to home page for now
    router.push("/app");
  }, [error, router, dispatch]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
