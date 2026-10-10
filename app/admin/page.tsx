"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  // State for the login form and session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // List of applications shown on the dashboard
  const [applications, setApplications] = useState<
    {
      id: string;
      name: string;
      email: string;
      domain: string;
      position: string;
      status: string;
    }[]
  >([]);

  // Summary counts shown in the stat cards
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  // Loading and error state for the applications list
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");

  // Check whether the admin already has a valid session
  async function checkSession() {
    try {
      const response = await fetch("/api/admin/session", {
        credentials: "same-origin",
      });

      setAuthenticated(response.ok);

      // Load applications only when the session is valid
      if (response.ok) {
        await loadApplications();
      }
    } catch {
      setAuthenticated(false);
    } finally {
      setCheckingSession(false);
    }
  }

  // Run the session check once when the page first loads
  useEffect(() => {
    async function initializeDashboard() {
      await checkSession();
    }

    void initializeDashboard();
  }, []);

  // Fetch all applications and summary stats from the API
  async function loadApplications() {
    setLoadingApplications(true);
    setApplicationsError("");

    try {
      const response = await fetch("/api/admin/applications", {
        credentials: "same-origin",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load applications.");
      }

      setApplications(result.applications ?? []);
      setStats(result.stats ?? { total: 0, pending: 0, approved: 0 });
    } catch (error) {
      setApplicationsError(
        error instanceof Error
          ? error.message
          : "Unable to load applications."
      );
    } finally {
      setLoadingApplications(false);
    }
  }

  // Approve or reject an application after confirmation
  async function updateApplicationStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    const action = status === "approved" ? "approve" : "reject";

    // Ask the admin to confirm before changing the status
    if (!window.confirm(`Are you sure you want to ${action} this application?`)) {
      return;
    }

    setApplicationsError("");

    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Unable to ${action} application.`);
      }

      // Reload the list so the new status is shown
      await loadApplications();
    } catch (error) {
      setApplicationsError(
        error instanceof Error
          ? error.message
          : `Unable to ${action} application.`
      );
    }
  }

  // Submit the login form and start an admin session
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed.");
      }

      // Clear the password and confirm the new session
      setPassword("");
      await checkSession();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to log in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // End the admin session and reset the login form
  async function handleLogout() {
    await fetch("/api/admin/session", {
      method: "POST",
      credentials: "same-origin",
    });

    setAuthenticated(false);
    setEmail("");
    setPassword("");
    setError("");
  }

  // Show a message while the session is being checked
  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b12]">
        <p className="text-gray-400">Checking admin session...</p>
      </main>
    );
  }

  // Show the login form when the admin is not signed in
  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b12] p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <p className="text-sm font-semibold text-cyan-400">
            EMBRIONE · RECRUITMENT
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage recruitment applications.
          </p>

          {/* Admin email field */}
          <label className="mt-6 block text-sm font-medium text-gray-300">
            Admin email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
              placeholder="Enter admin email"
            />
          </label>

          {/* Admin password field */}
          <label className="mt-4 block text-sm font-medium text-gray-300">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
              placeholder="Enter password"
            />
          </label>

          {/* Login error message */}
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Sign in button (disabled while submitting) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-black hover:bg-cyan-300 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  // Dashboard shown once the admin is signed in
  return (
    <main className="min-h-screen bg-[#080b12] p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Dashboard header with title and logout button */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              EMBRIONE · RECRUITMENT
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-400">
              You are signed in. Application management comes next.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-fit rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-medium text-gray-300 hover:bg-white/10"
          >
            Log out
          </button>
        </header>

        {/* Summary cards showing application counts */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Applications", value: stats.total, color: "text-white" },
            { label: "Pending Review", value: stats.pending, color: "text-amber-400" },
            { label: "Approved Members", value: stats.approved, color: "text-emerald-400" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className={`mt-3 text-3xl font-bold ${item.color}`}>
                {loadingApplications ? "…" : item.value}
              </p>
            </div>
          ))}
        </section>

        {/* List of all applications */}
        <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
          {/* Section heading and refresh button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">
              All Applications
            </h2>

            <button
              onClick={loadApplications}
              disabled={loadingApplications}
              className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingApplications ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {/* Error message for loading or updating applications */}
          {applicationsError && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {applicationsError}
            </p>
          )}

          {/* Loading message */}
          {loadingApplications && (
            <p className="mt-4 text-gray-400">Loading applications…</p>
          )}

          {/* Empty state when there are no applications */}
          {!loadingApplications && !applicationsError && applications.length === 0 && (
            <p className="mt-4 text-gray-400">No applications found.</p>
          )}

          {/* One card for each application */}
          <div className="mt-5 space-y-4">
            {applications.map((application) => (
              <article
                key={application.id}
                className="rounded-lg border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  {/* Applicant details */}
                  <div>
                    <h3 className="font-semibold text-white">
                      {application.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {application.email}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      {application.domain} · {application.position}
                    </p>
                  </div>

                  {/* Status badge and action buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-sm capitalize text-gray-300">
                      {application.status}
                    </span>

                    {/* Approve button (hidden once approved) */}
                    {application.status !== "approved" && (
                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "approved")
                        }
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                    )}

                    {/* Reject button (hidden once rejected) */}
                    {application.status !== "rejected" && (
                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "rejected")
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}