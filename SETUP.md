# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your PostgreSQL connection string:
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
     ```

3. **Initialize the database:**
   ```bash
   # Generate Prisma Client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content via Postman

### Create a Blog Post

**POST** `http://localhost:3000/api/blogs`

```json
{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "summary": "A brief summary of the blog post that will appear in the grid",
  "content": "<p>This is the full blog content. You can use HTML here.</p><h2>Section Title</h2><p>More content...</p>",
  "thumbnail": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
  "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
  "publishedAt": "2024-01-01T00:00:00Z"
}
```

### Create a Project

**POST** `http://localhost:3000/api/projects`

```json
{
  "title": "My Awesome Project",
  "slug": "my-awesome-project",
  "description": "A detailed description of the project. This will appear on the project detail page.",
  "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
  "link": "https://example.com",
  "github": "https://github.com/username/repo",
  "techStack": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  "publishedAt": "2024-01-01T00:00:00Z"
}
```

## Alternative: Using Prisma Studio

You can also add content using Prisma Studio (GUI):

```bash
npm run db:studio
```

This will open a web interface at `http://localhost:5555` where you can add, edit, and delete blog posts and projects.

## Notes

- Make sure your PostgreSQL database is running before starting the app
- The `publishedAt` field is required for content to appear on the homepage
- Use unique slugs for each blog post and project
- Image URLs should be publicly accessible (or use local images with proper Next.js Image configuration)


