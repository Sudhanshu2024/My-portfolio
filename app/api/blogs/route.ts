import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        publishedAt: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        thumbnail: true,
        createdAt: true,
      },
    })

    // ✅ ALWAYS RETURN ARRAY
    return NextResponse.json(Array.isArray(blogs) ? blogs : [])
  } catch (error) {
    console.error('Error fetching blogs:', error)

    // ✅ Return empty array instead of error object
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, summary, content, thumbnail, image, publishedAt } = body

    if (!title || !slug || !summary || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, summary, content' },
        { status: 400 }
      )
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        summary,
        content,
        thumbnail: thumbnail || null,
        image: image || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
