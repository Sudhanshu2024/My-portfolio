import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const featured = searchParams.get('featured') // ?featured=true for homepage

    const projects = await prisma.project.findMany({
      where: { 
        status: 'Published',
        ...(featured === 'true' && { featured: true })
      },
      orderBy: { dateCompleted: 'desc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    let body;
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { status: 400 }
      )
    }

    const { 
      slug, 
      title, 
      preview, 
      body: content, 
      tags, 
      status, 
      thumbnail,
      demoUrl,
      githubUrl,
      featured 
    } = body

    // Validate required fields
    if (!slug || !title) {
      return NextResponse.json(
        { error: 'Slug and title are required' }, 
        { status: 400 }
      )
    }

    // Create project
    const newProject = await prisma.project.create({
      data: {
        slug,
        title,
        preview: preview || null,
        body: content || null,
        tags: Array.isArray(tags) ? tags : [],
        thumbnail: thumbnail || null,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        featured: featured === true,
        status: status || 'Draft',
        dateCompleted: status === 'Published' ? new Date() : null,
      },
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}