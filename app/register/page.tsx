"use client";

import { useState } from "react";

export default function RegisterPage() {
  // State for the form fields and UI
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [bio, setBio] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#080b12] px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        {/* Navigation link to the home page */}
        <a href="/" className="text-cyan-400 hover:underline">
          ← Back to Home
        </a>

        {/* Page heading and introduction */}
        <h1 className="mt-8 text-4xl font-bold">Join The Embrione</h1>

        <p className="mt-3 text-gray-400">
          Tell us about yourself and the role you want to pursue.
        </p>

        {/* Registration form */}
        <form className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          {/* STAGE 2: text fields */}
          {/* STAGE 3: dropdowns */}
          {/* STAGE 4: github + bio */}
          {/* STAGE 5: photo upload */}
          {/* STAGE 6: submit button */}
        </form>

        {/* STAGE 6: confirmation banner */}
        {/* STAGE 7: live preview */}
      </div>
    </main>
  );
}