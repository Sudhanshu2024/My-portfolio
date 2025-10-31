import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'Published' },
      orderBy: { datePublished: 'desc' },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { slug, title, preview, body: content, tags, status } = body

    if (!slug || !title)
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })

    const newBlog = await prisma.blog.create({
      data: {
        slug,
        title,
        preview,
        body: content,
        tags,
        status: status || 'Draft',
        datePublished: status === 'Published' ? new Date() : null,
      },
    })

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
