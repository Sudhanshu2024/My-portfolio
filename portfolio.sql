--
-- PostgreSQL database dump
--

\restrict s0SN5bzfFJ1wlYpn2b4TDAkN94w6D3YhZB9gZTzhwKi0fnAv90HhnzSzf1jaNe8

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blog" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    thumbnail text,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "publishedAt" timestamp(3) without time zone
);


ALTER TABLE public."Blog" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    image text,
    thumbnail text,
    link text,
    github text,
    "techStack" text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "publishedAt" timestamp(3) without time zone
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blog" (id, title, slug, summary, content, thumbnail, image, "createdAt", "updatedAt", "publishedAt") FROM stdin;
cmhpzb1u6000014fc6toykznh	Why Minimal Design Improves User Experience	minimal-design-improves-ux	Minimal design improves focus, clarity, and reduces cognitive overload.	Minimalist design emphasizes clarity, spacing, and essential elements. By removing unnecessary visual noise, interfaces become easier to navigate and understand. Good minimal design increases readability, improves user flow, and makes interactions more intuitive.	/blogThumbnail/VS-CODE.jpg	/images/blog/minimal-ux-cover.jpg	2025-11-08 07:44:26.12	2025-11-08 08:28:43.189	2024-01-10 10:00:00
cmhpzb9d3000114fcwo99tmqg	A Beginner’s Guide to Tailwind CSS	beginners-guide-tailwind-css	Tailwind CSS speeds up UI development using utility-first classes.	Tailwind CSS provides atomic utility classes that let you design directly in your markup. It removes the need to write CSS files and promotes a consistent design system. With responsive prefixes, design tokens, and customization options, Tailwind is becoming the standard for web styling.	/blogThumbnail/VS-CODE.jpg	/images/blog/tailwind-beginner-cover.jpg	2025-11-08 07:44:36.135	2025-11-08 08:29:55.97	2024-02-05 14:30:00
cmhpzbfcm000214fcaijqc481	How to Deploy a Next.js App on Vercel	deploy-nextjs-on-vercel	Deploying a Next.js app to Vercel is fast, simple, and requires zero configuration.	To deploy a Next.js application on Vercel, connect your GitHub repository and let Vercel handle the rest. It automatically builds, optimizes, and deploys your app. With features like automatic previews, CDN caching, and edge functions, Vercel is ideal for production-grade Next.js apps.	/blogThumbnail/VS-CODE.jpg	/images/blog/vercel-deploy-cover.jpg	2025-11-08 07:44:43.887	2025-11-08 08:29:55.97	2024-03-12 08:20:00
cmhpzblb7000314fc0jgpdt2h	Understanding API Rate Limiting	understanding-api-rate-limiting	Rate limiting protects APIs from abuse and helps guarantee stable performance.	API rate limiting helps you manage incoming requests by defining how often a client may hit an endpoint. It prevents abuse, blocks DDoS attacks, and ensures fair resource usage. Popular rate-limiting strategies include fixed window, sliding window, and token bucket algorithms.	/blogThumbnail/VS-CODE.jpg	/images/blog/rate-limit-cover.jpg	2025-11-08 07:44:51.619	2025-11-08 08:29:55.97	2024-04-22 18:00:00
cmhpzbsf1000414fcka927mdi	Why Every Developer Should Learn Git	why-every-developer-should-learn-git	Git is essential for version control, collaboration, and modern development workflows.	Git allows developers to track code changes, collaborate with teams, and maintain clean project history. Features like branching, merging, pull requests, and CI/CD pipelines make Git indispensable in software development. Mastering Git improves productivity and teamwork.	/blogThumbnail/VS-CODE.jpg	/images/blog/git-guide-cover.jpg	2025-11-08 07:45:00.827	2025-11-08 08:29:55.97	2024-05-15 11:45:00
cmhpzby6k000514fcmlhbhmfm	Dark Mode Design Principles	dark-mode-design-principles	A well-designed dark mode requires proper contrast, color balance, and readability.	Dark mode interfaces should avoid pure black and pure white. Designers must use balanced contrast, soft grays, and properly tuned accent colors. Good dark mode reduces eye strain and enhances readability, especially in low-light environments.	/blogThumbnail/VS-CODE.jpg	/images/blog/dark-mode-cover.jpg	2025-11-08 07:45:08.3	2025-11-08 08:29:55.97	2024-06-18 09:10:00
cmhpzc3xt000614fcdxcwtt6l	Building Scalable APIs with Node.js	building-scalable-nodejs-apis	Node.js is ideal for creating highly scalable backend services.	Node.js handles concurrent requests efficiently with its event-driven and non-blocking architecture. To build scalable APIs, developers implement caching, load balancing, connection pooling, and database optimization. Frameworks like Fastify and Express help structure production APIs.	/blogThumbnail/VS-CODE.jpg	/images/blog/nodejs-scale-cover.jpg	2025-11-08 07:45:15.761	2025-11-08 08:29:55.97	2024-07-02 16:50:00
cmhpzc8un000714fcmqw9dpny	Top 5 VS Code Extensions for Developers	top-5-vscode-extensions	Improve your workflow with these essential VS Code extensions.	VS Code extensions like Prettier, ESLint, GitLens, Tailwind IntelliSense, and Thunder Client significantly enhance productivity. They help with formatting, debugging, Git workflow, API testing, and working with Tailwind CSS utilities. Together, they create an efficient development environment.	/blogThumbnail/VS-CODE.jpg	/images/blog/vscode-top5-cover.jpg	2025-11-08 07:45:22.127	2025-11-08 08:30:27.791	2024-08-11 12:00:00
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, title, slug, description, image, thumbnail, link, github, "techStack", "createdAt", "updatedAt", "publishedAt") FROM stdin;
cmhpzhzms000814fc2kkqa7i5	Personal Portfolio Website	personal-portfolio-website	A modern personal portfolio built with Next.js, showcasing projects, blog posts, and a clean minimal UI inspired by indie-hacker design principles.	/images/projects/portfolio-cover.jpg	/images/projects/portfolio-thumb.jpg	https://yourdomain.com	https://github.com/yourname/portfolio	{Next.js,TailwindCSS,"Framer Motion",TypeScript}	2025-11-08 07:49:50.111	2025-11-08 07:49:50.111	2024-01-15 10:00:00
cmhpzi6rh000914fc0i6kq4ks	Task Manager App	task-manager-app	A productivity-focused task manager with categories, reminders, drag-and-drop sorting, and real-time sync across devices.	/images/projects/taskmanager-cover.jpg	/images/projects/taskmanager-thumb.jpg	https://taskmanager-app.vercel.app	https://github.com/yourname/task-manager	{React,Node.js,Express,MongoDB}	2025-11-08 07:49:59.358	2025-11-08 07:49:59.358	2024-02-02 12:00:00
cmhpzid8o000a14fcmllmw0gf	Full-Stack Ecommerce Store	fullstack-ecommerce-store	A fully functional ecommerce platform featuring product management, checkout flow, Stripe payments, and an admin dashboard.	/images/projects/ecommerce-cover.jpg	/images/projects/ecommerce-thumb.jpg	https://myecommerce.shop	https://github.com/yourname/ecommerce-store	{Next.js,Prisma,PostgreSQL,Stripe}	2025-11-08 07:50:07.751	2025-11-08 07:50:07.751	2024-02-28 09:00:00
cmhpziidb000b14fcx5babq3d	AI Text Summarizer	ai-text-summarizer	An AI-powered summarizer that generates concise summaries from long articles using NLP and transformer models.	/images/projects/ai-summarizer-cover.jpg	/images/projects/ai-summarizer-thumb.jpg	https://ai-summarizer.vercel.app	https://github.com/yourname/ai-summarizer	{Next.js,"OpenAI API",TailwindCSS}	2025-11-08 07:50:14.399	2025-11-08 07:50:14.399	2024-03-12 15:00:00
cmhpziqi3000c14fcx6vfa34b	Real-Time Chat Application	real-time-chat-app	A real-time chat application with typing indicators, message history, online status tracking, and WebSocket-based communication.	/images/projects/chatapp-cover.jpg	/images/projects/chatapp-thumb.jpg	https://chatapp-demo.vercel.app	https://github.com/yourname/realtime-chat	{React,Socket.io,Node.js}	2025-11-08 07:50:24.939	2025-11-08 07:50:24.939	2024-03-20 11:45:00
cmhpzixtl000d14fc45m55lis	URL Shortener	url-shortener	A lightweight and fast URL shortener with analytics, QR code generation, and expiration support.	/images/projects/urlshortener-cover.jpg	/images/projects/urlshortener-thumb.jpg	https://shortify.link	https://github.com/yourname/url-shortener	{Next.js,Redis,PostgreSQL}	2025-11-08 07:50:34.173	2025-11-08 07:50:34.173	2024-04-05 14:00:00
cmhpzj4sj000e14fcp3xv4ohv	Fitness Tracking App	fitness-tracking-app	A fitness tracking application with workout plans, progress charts, exercise library, and personalized recommendations.	/images/projects/fitness-cover.jpg	/images/projects/fitness-thumb.jpg	https://fitness-app-demo.netlify.app	https://github.com/yourname/fitness-tracker	{"React Native",Expo,Firebase}	2025-11-08 07:50:43.459	2025-11-08 07:50:43.459	2024-04-25 17:20:00
cmhpzjasz000f14fc72hnme08	Blog CMS Admin Dashboard	blog-cms-admin-dashboard	A custom CMS dashboard that allows creating, editing, and publishing blog posts with a clean UI and rich-text editor.	/images/projects/blogcms-cover.jpg	/images/projects/blogcms-thumb.jpg	https://cms-dashboard.vercel.app	https://github.com/yourname/blog-cms-dashboard	{Next.js,Prisma,"ShadCN UI",TypeScript}	2025-11-08 07:50:51.25	2025-11-08 07:50:51.25	2024-05-01 10:40:00
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
94ce6030-810d-4306-bad9-199384d55747	c797f964766fa4e070e9ccb37af57e148db692fa0faa33fb9281d52e5fef4e6a	2025-11-08 00:25:55.574788+05:30	20251107185555_init	\N	\N	2025-11-08 00:25:55.535847+05:30	1
\.


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Blog_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Blog_slug_idx" ON public."Blog" USING btree (slug);


--
-- Name: Blog_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Blog_slug_key" ON public."Blog" USING btree (slug);


--
-- Name: Project_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Project_slug_idx" ON public."Project" USING btree (slug);


--
-- Name: Project_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Project_slug_key" ON public."Project" USING btree (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict s0SN5bzfFJ1wlYpn2b4TDAkN94w6D3YhZB9gZTzhwKi0fnAv90HhnzSzf1jaNe8

