import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// GET /api/articles/[id] - Get a single post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = await db.select().from(posts).where(eq(posts.id, postId)).get();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/articles/[id] - Update a post
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const body = await request.json();

    const updatedPost = await db.update(posts)
      .set({
        title: body.title,
        slug: body.slug,
        subtitle: body.subtitle,
        content: body.content,
        excerpt: body.excerpt,
      })
      .where(eq(posts.id, postId))
      .returning();

    if (updatedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost[0]);
  } catch (error: any) {
    console.error('Error updating article:', error);
    
    // Check for unique constraint violation on slug
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/articles/[id] - Delete a post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const deletedPost = await db.delete(posts)
      .where(eq(posts.id, postId))
      .returning();

    if (deletedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
