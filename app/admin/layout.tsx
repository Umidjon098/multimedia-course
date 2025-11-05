import { getUser, logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Home, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  Admin Panel
                </span>
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  Lessons
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <form action={logout}>
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
