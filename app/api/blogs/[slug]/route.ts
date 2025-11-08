import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// These export configs tell Next.js NOT to try to statically generate this route
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 300 // Revalidate every 5 minutes
export const runtime = 'nodejs'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const blog = await prisma.blog.findUnique({
      where: { slug },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}