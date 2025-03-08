import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold">Task Not Found</h2>
      <p>The task you are looking for doesn’t exist.</p>
      <Link href="/" className="text-blue-600 underline mt-4 inline-block">
        Back to Homepage
      </Link>
    </div>
  );
}
