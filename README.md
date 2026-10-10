# Embroine — Recruitment Portal

A recruitment portal for **The Embrione, PES University**, built with Next.js and Supabase.

## Features

- **Homepage:** Navigation to registration, the team directory, and admin login.
- **Candidate Registration:** Collects student details, academic information, domain and position preferences, profile photo, social links, and a short biography.
- **Profile Photo Upload:** Uploads candidate photos to Supabase Storage.
- **Admin Dashboard:** Allows administrators to review applications and approve or reject candidates.
- **Team Directory:** Displays approved members and provides filtering options.
- **Application Status:** Pending applications are reviewed before appearing on the public team page.
- **Responsive Interface:** Dark-themed interface styled with Tailwind CSS.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase Database
- Supabase Storage
- Vercel

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/register` | Candidate registration |
| `/admin` | Admin login and application moderation |
| `/team` | Approved team members |

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project
- The required Supabase environment variables

### Installation

Clone the repository:

```bash
git clone https://github.com/nikethbp/embrione-team.git
cd embrione-team
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Configure the required environment variables in a local `.env.local` file and in your deployment settings.

Use the variable names expected by the application for Supabase and admin authentication. Keep all credentials and secret keys private.

**Never commit `.env.local` or expose your Supabase service-role key, admin password, or session secret.**

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Deployment

The application is deployed using Vercel. Configure the required environment variables in the Vercel project settings before deploying.

## Application Workflow

1. A candidate submits the registration form and profile photo.
2. The application is stored in Supabase with a pending status.
3. An administrator reviews the application in the admin dashboard.
4. Approved candidates appear on the team page.
5. Rejected candidates are excluded from the public team directory.

## Repository

GitHub: [nikethbp/embrione-team](https://github.com/nikethbp/embrione-team)

---

Built for The Embrione, PES University.