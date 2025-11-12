"use client";

import { useState, useEffect } from "react";

export default function AuthOverlay({ onLoginComplete }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("demo_logged_in") === "true") {
      onLoginComplete?.();
    }
  }, [onLoginComplete]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Minimal client validation
    if (!form.username?.trim() || !form.email?.trim()) {
      setError("Please provide username and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.message || "Server error");

      // mark logged in (dummy)
      localStorage.setItem("demo_logged_in", "true");
      onLoginComplete?.();
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  // Full-screen overlay
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl border border-gray-200/60">
        <h2 className="text-2xl font-semibold mb-2">Welcome — Sign up</h2>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 rounded-md border"
            autoFocus
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded-md border"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-3 rounded-md border"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3 rounded-md border"
            />
          </div>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-3 rounded-md border"
          >
            <option value="">Gender (optional)</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {error && <div className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-md bg-black text-white font-medium"
          >
            {loading ? "Saving..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
