import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// Definicja tabeli
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  subtitle: text('subtitle'),
  content: text('content').notNull(), // Tu trafia Markdown
  excerpt: text('excerpt'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;
