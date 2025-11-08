# Sudhanshu Portfolio

A minimal, elegant portfolio website inspired by dominiksobe.com, built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Hero Section**: Clean, centered hero with smooth animations and interactive background effects
- **Blog Grid**: Display 4 blog posts in a responsive grid layout
- **Projects Carousel**: Smooth, touch-friendly carousel for showcasing projects
- **Dynamic Routing**: Individual pages for blog posts and projects
- **API Routes**: RESTful API endpoints for blogs and projects
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Smooth scroll animations and transitions using Framer Motion
- **Responsive Design**: Fully responsive and mobile-friendly

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment Ready**: Configured for Vercel/Railway

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd SudhanshuPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your PostgreSQL connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content

### Using Postman (or any API client)

The API endpoints are already set up! You can use Postman to add content.

#### Create a Blog Post

**POST** `http://localhost:3000/api/blogs`

```json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "summary": "A brief summary of the blog post",
  "content": "<p>Full blog content in HTML format</p><h2>Section Title</h2><p>More content...</p>",
  "thumbnail": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
  "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
  "publishedAt": "2024-01-01T00:00:00Z"
}
```

#### Create a Project

**POST** `http://localhost:3000/api/projects`

```json
{
  "title": "My Awesome Project",
  "slug": "my-awesome-project",
  "description": "A detailed description of the project",
  "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
  "link": "https://example.com",
  "github": "https://github.com/username/repo",
  "techStack": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  "publishedAt": "2024-01-01T00:00:00Z"
}
```

### Alternative: Using Prisma Studio

You can also add content using Prisma Studio (GUI):

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can add, edit, and delete blog posts and projects directly.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── blogs/
│   │   │   ├── route.ts          # GET all blogs
│   │   │   └── [slug]/route.ts   # GET single blog
│   │   └── projects/
│   │       ├── route.ts          # GET all projects
│   │       └── [slug]/route.ts   # GET single project
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx          # Blog detail page
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx          # Project detail page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── Hero.tsx                  # Hero section
│   ├── BlogGrid.tsx              # Blog grid component
│   ├── ProjectsCarousel.tsx      # Projects carousel
│   └── Footer.tsx                # Footer component
├── lib/
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   └── schema.prisma             # Database schema
└── package.json
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

### Railway

1. Create a new project in Railway
2. Add a PostgreSQL database
3. Connect your GitHub repository
4. Add the `DATABASE_URL` environment variable
5. Deploy!

After deployment, run migrations:
```bash
npx prisma migrate deploy
```

## Customization

- Update your name and title in `components/Hero.tsx`
- Update social links in `components/Footer.tsx`
- Customize colors in `tailwind.config.ts`
- Modify animations in component files

## License

MIT

