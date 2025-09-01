import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Rumaa</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 hover:cursor-pointer">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
