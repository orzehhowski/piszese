import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { desc } from 'drizzle-orm';

// GET /api/articles - List all posts
export async function GET() {
  try {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/articles - Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simple validation (you might want to use Zod)
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await db.insert(posts).values({
      title: body.title,
      slug: body.slug,
      subtitle: body.subtitle,
      content: body.content,
      excerpt: body.excerpt,
      headerImage: body.headerImage,
      isDraft: body.isDraft ?? false,
    }).returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    
    // Check for unique constraint violation on slug
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
