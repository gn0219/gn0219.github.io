# Gyuna's Personal Homepage

This is my personal homepage built with Next.js and TypeScript.

## Project Structure

```
gyuna.github.io/
├── src/
│   ├── data/           # Data files containing profile, research, projects, and publications information
│   ├── components/     # Reusable React components
│   └── pages/          # Next.js pages
├── public/             # Static assets
│   ├── galleries/      # Image galleries
│   ├── projects/       # Project-related assets
│   └── publications/   # Publication-related assets
```

## Data Structure

- `profile.ts`: Contains personal information, contact details, and bio
- `research.ts`: Research interests and focus areas
- `projects.ts`: List of projects with descriptions and links
- `publications.ts`: Academic publications and papers

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Technologies Used

- Next.js
- TypeScript
- React
- Tailwind CSS (for styling) 