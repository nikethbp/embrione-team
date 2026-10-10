
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b12] text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h2 className="text-xl font-bold tracking-widest">
          EMBRIONE
        </h2>
        <span className="text-sm text-gray-400">
          Recruitment Portal
        </span>
      </nav>

      <section className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-center px-8">
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

        <div className="mt-8">
          <a
            href="/register"
            className="inline-block rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Join the Team →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-8 py-5 text-sm text-gray-500">
        The Embrione · PES University
      </footer>
    </main>
  );
}

