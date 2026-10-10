"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

// Shape of a team member returned from the database
type TeamMember = {
  id: string | number;
  name: string;
  domain: string | null;
  position: string | null;
  photo_url: string | null;
};

export default function TeamPage() {
  // State for the members list, selected filters, and UI status
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [domain, setDomain] = useState("All");
  const [position, setPosition] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load approved team members once when the page first loads
  useEffect(() => {
    async function loadTeam() {
      setLoading(true);
      setError("");

      // Fetch approved members sorted by name
      const { data, error: queryError } = await supabase
        .from("approved_team")
        .select("id, name, domain, position, photo_url")
        .order("name", { ascending: true });

      if (queryError) {
        setError("Unable to load the team. Please try again later.");
      } else {
        setMembers((data ?? []) as TeamMember[]);
      }

      setLoading(false);
    }

    void loadTeam();
  }, []);

  // Fixed list of domains shown in the domain filter dropdown
  const domains = [
    "All",
    "Web Development",
    "Design",
    "Logistics",
    "Operations",
    "Sponsorship",
    "Hospitality",
    "Social Media",
    "Event Management",
  ];

  // Fixed list of positions shown in the position filter dropdown
  const positions = [
    "All",
    "Head",
    "Vice-Head",
    "Core Member",
    "Member",
  ];

  // Keep only the members that match the selected filters
  const filteredMembers = members.filter((member) => {
    const matchesDomain =
      domain === "All" || member.domain === domain;
    const matchesPosition =
      position === "All" || member.position === position;

    return matchesDomain && matchesPosition;
  });

  return (
    <main className="min-h-screen bg-[#080b12] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading and introduction */}
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            EMBRIONE
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Meet Our Team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Meet the people building, creating, and growing together.
          </p>
        </header>

        {/* Filter controls for domain and position */}
        <section
          aria-label="Filter team members"
          className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row"
        >
          {/* Domain filter */}
          <label className="flex-1 text-sm font-medium text-gray-300">
            Filter by domain
            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#11141d] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
            >
              {domains.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>

          {/* Position filter */}
          <label className="flex-1 text-sm font-medium text-gray-300">
            Filter by position
            <select
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#11141d] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
            >
              {positions.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>

          {/* Reset both filters back to "All" */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setDomain("All");
                setPosition("All");
              }}
              className="w-full rounded-lg border border-white/10 px-4 py-2.5 font-medium text-gray-300 hover:bg-white/10 sm:w-auto"
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* Loading text or the number of matching members */}
        <p className="mt-6 text-sm text-gray-400">
          {loading
            ? "Loading team members…"
            : `${filteredMembers.length} team member${filteredMembers.length === 1 ? "" : "s"}`}
        </p>

        {/* Error message when the team fails to load */}
        {error && (
          <p role="alert" className="mt-6 rounded-lg bg-red-500/10 p-4 text-red-300">
            {error}
          </p>
        )}

        {/* Empty state when no members match */}
        {!loading && !error && filteredMembers.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No team members found
            </h2>
            <p className="mt-2 text-gray-400">
              Try changing your filters, or check back when members have been approved.
            </p>
          </div>
        )}

        {/* Grid of team member cards */}
        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-cyan-400/40"
            >
              {/* Member photo, or the first letter of the name as a fallback */}
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={`${member.name}'s profile`}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-cyan-400/10 text-5xl font-bold text-cyan-400/50">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Member name, position, and domain */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white">
                  {member.name}
                </h2>
                <p className="mt-1 font-medium text-cyan-400">
                  {member.position || "Team Member"}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {member.domain || "Embrione"}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}