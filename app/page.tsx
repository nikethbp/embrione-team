export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b12] text-white">
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-8 py-6">
        <a
          href="/"
          className="text-xl font-bold tracking-widest"
        >
          EMBRIONE
        </a>

        <a
          href="/admin"
          className="rounded-full border border-cyan-400/50 px-4 py-2 text-sm text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
        >
          Admin Login
        </a>
      </nav>

      <section className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-center px-8 py-16">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Find your place
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Build the team.
          <br />
          Shape the future.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
          Welcome to The Embrione recruitment portal.
          Discover opportunities, share your skills, and
          become part of something meaningful.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/register"
            className="inline-block rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Join the Team →
          </a>

          <a
            href="/team"
            className="inline-block rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Meet the Team →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-8 py-5 text-sm text-gray-500">
        The Embrione · PES University
      </footer>
    </main>
  );
}