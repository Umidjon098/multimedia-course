"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, signup, getUser } from "@/lib/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      if (user) {
        router.push("/admin");
      } else {
        setChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = isSignup ? await signup(formData) : await login(formData);
      if (result && "success" in result) {
        setSuccess(result.success);
      } else if (result && "error" in result) {
        if (result.error.includes("check your email")) {
          setSuccess(
            "Hisobingizni tasdiqlash uchun elektron pochtangizni tekshiring, so'ng tizimga kiring.",
          );
        } else {
          setError(result.error);
        }
      }
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              {"Ta'lim Platformasi"}
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isSignup ? "Hisob yaratish" : "Boshqaruv paneliga kirish"}
            </CardTitle>
            <CardDescription>
              {isSignup
                ? "Darslarni boshqarish uchun ro'yxatdan o'ting"
                : "Boshqaruv paneliga kirish uchun tizimga kiring"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                label="Elektron pochta"
                required
                placeholder="admin@example.com"
              />
              <Input
                type="password"
                name="password"
                label="Parol"
                required
                placeholder="••••••••"
              />

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                  ✓ {success}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? "Iltimos, kuting..."
                  : isSignup
                    ? "Ro'yxatdan o'tish"
                    : "Kirish"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
                className="text-blue-600 hover:underline"
              >
                {isSignup
                  ? "Hisobingiz bormi? Tizimga kiring"
                  : "Hisobingiz yo'qmi? Ro'yxatdan o'ting"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:underline">
                ← Darslarga qaytish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
