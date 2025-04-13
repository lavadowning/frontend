import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-bold">404 Not Found</h1>
      <p className="text-gray-600 mt-2">
        Your visited page not found. You may go home page.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Back to home page
      </Link>
    </div>
  );
}
