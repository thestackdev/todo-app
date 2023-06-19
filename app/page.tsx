"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppwrite } from "@/providers/appwrite-provider";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { user, login, sessionLoading } = useAppwrite();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login(form.email, form.password);
    setLoading(false);
  };

  useEffect(() => {
    if (!sessionLoading && user) router.push("/dashboard");
  }, [user, sessionLoading]);

  if (user) return null;

  return (
    <main className="w-full max-w-screen-sm mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <Card className="mt-4 p-4 w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              className="mt-2"
              type="email"
              placeholder="user@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              className="mt-2"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <Button disabled={loading} className="mt-4 w-full">
            {loading && <Loader className="mr-2 animate-spin" size={16} />}
            Login
          </Button>
        </form>
        <div className="text-center mt-4">
          <span>
            Dont have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </span>
        </div>
      </Card>
    </main>
  );
}
