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
              <form
          onSubmit={(event) => {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Display the demo submission confirmation
            setSubmitted(true);
          }}
          className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
        

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



                  {/* Profile photo upload and preview handling */}
          <div>
            <label htmlFor="photo" className="mb-2 block text-sm font-medium">
              Profile Photo
            </label>
            <input
              onChange={(event) => {
                // Get the first selected image file
                const file = event.target.files?.[0];

                // Create a temporary URL for the image preview
                if (file) {
                  setPhotoPreview(URL.createObjectURL(file));
                }
              }}
              id="photo"
              name="photo"
              type="file"
              accept="image/png,image/jpeg"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:font-semibold file:text-black"
            />
            <p className="mt-2 text-xs text-gray-400">Upload a PNG or JPG image.</p>
          </div>

          {/* Submit the registration form */}
          <button
            type="submit"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Continue
          </button>
        </form>

                {/* Display the submission confirmation */}
        {submitted && (
          <div className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4">
            <p className="font-semibold text-cyan-300">
              Form submitted successfully!
            </p>
            <p className="mt-1 text-sm text-gray-300">
              This is a demo confirmation. Your application has not been saved yet.
            </p>
          </div>
        )}

        
        {/* STAGE 7: live preview */}
      </div>
    </main>
  );
}