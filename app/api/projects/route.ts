import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
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
        description: true,
        thumbnail: true,
        techStack: true,
        createdAt: true,
      },
    })

    // ✅ ALWAYS return an array (never an error object)
    return NextResponse.json(Array.isArray(projects) ? projects : [])
  } catch (error) {
    console.error('Error fetching projects:', error)
    
    // ✅ Fallback: still return empty array so UI never breaks
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      description,
      thumbnail,
      image,
      link,
      github,
      techStack,
      publishedAt,
    } = body

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, description' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        thumbnail: thumbnail || null,
        image: image || null,
        link: link || null,
        github: github || null,
        techStack: techStack || [],
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
