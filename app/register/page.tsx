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
        

        {/* Full name field */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Student registration number field */}
          <div>
            <label htmlFor="srn" className="mb-2 block text-sm font-medium">
              SRN
            </label>
            <input
              id="srn"
              name="srn"
              type="text"
              placeholder="Enter your SRN"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* LinkedIn profile URL field */}
          <div>
            <label htmlFor="linkedin" className="mb-2 block text-sm font-medium">
              LinkedIn URL
            </label>
            <input
              id="linkedin"
              name="linkedin_url"
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

                  {/* Domain selection */}
          <div>
            <label htmlFor="domain" className="mb-2 block text-sm font-medium">
              Domain
            </label>
            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              id="domain"
              name="domain"
              required
              className="w-full rounded-lg border border-white/10 bg-[#11141d] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" disabled>
                Select a domain
              </option>
              <option>Web Development</option>
              <option>Design</option>
              <option>Logistics</option>
              <option>Operations</option>
              <option>Sponsorship</option>
              <option>Hospitality</option>
              <option>Social Media</option>
              <option>Event Management</option>
            </select>
          </div>

          {/* Position selection */}
          <div>
            <label htmlFor="position" className="mb-2 block text-sm font-medium">
              Position
            </label>
            <select
              id="position"
              name="position"
              required
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-[#11141d] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" disabled>
                Select a position
              </option>
              <option>Head</option>
              <option>Vice-Head</option>
              <option>Core Member</option>
              <option>Member</option>
            </select>
          </div>

          {/* Academic branch selection */}
          <div>
            <label htmlFor="branch" className="mb-2 block text-sm font-medium">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              required
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-[#11141d] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" disabled>
                Select your branch
              </option>
              <option>CSE</option>
              <option>AIML</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>ME</option>
              <option>Biotech</option>
              <option>Other</option>
            </select>
          </div>

          {/* Semester selection */}
          <div>
            <label htmlFor="semester" className="mb-2 block text-sm font-medium">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              required
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-[#11141d] px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" disabled>
                Select your semester
              </option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>



                  {/* GitHub profile URL field */}
          <div>
            <label htmlFor="github" className="mb-2 block text-sm font-medium">
              GitHub URL
            </label>
            <input
              id="github"
              name="github_url"
              type="url"
              placeholder="https://github.com/your-username"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Short biography field */}
          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-medium">
              Short Bio
            </label>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              id="bio"
              name="bio"
              rows={4}
              maxLength={200}
              placeholder="Tell us a little about yourself (max 200 characters)"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
            <p className="mt-2 text-xs text-gray-400">Maximum 200 characters.</p>
          </div>
          {/* STAGE 5: photo upload */}
          {/* STAGE 6: submit button */}
        </form>

        {/* STAGE 6: confirmation banner */}
        {/* STAGE 7: live preview */}
      </div>
    </main>
  );
}