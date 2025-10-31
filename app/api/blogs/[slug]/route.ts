import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured') // ?featured=true for homepage

    const blogs = await prisma.blog.findMany({
      where: { 
        status: 'Published',
        ...(featured === 'true' && { displayLocation: 'HOME_AND_BLOG' })
      },
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
    const { slug, title, preview, body: content, tags, status, thumbnail, displayLocation } = body

    if (!slug || !title)
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })

    const newBlog = await prisma.blog.create({
      data: {
        slug,
        title,
        preview,
        body: content,
        tags,
        thumbnail,
        displayLocation: displayLocation || 'BLOG_ONLY',
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