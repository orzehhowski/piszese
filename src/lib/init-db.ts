import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { posts } from './schema';

async function initDb() {
  const sqlite = new Database('./data/sqlite.db');
  const db = drizzle(sqlite);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      subtitle TEXT,
      content TEXT NOT NULL,
      excerpt TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const existing = sqlite.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  if (existing.count === 0) {
    sqlite.prepare(
      `INSERT INTO posts (title, slug, subtitle, content, excerpt) VALUES (?, ?, ?, ?, ?)`,
    ).run(
      'Mój pierwszy wpis',
      'moj-pierwszy-wpis',
      'Witaj na moim blogu!',
      '# Witaj na moim blogu!\n\nTo jest mój pierwszy wpis. Cieszę się, że tutaj trafiłeś.\n\nW tym blogu będę pisał o:\n- Programowaniu\n- Technologii\n- Różnych ciekawostkach',
      'Pierwszy artykuł na start bloga.',
    );

    sqlite.prepare(
      `INSERT INTO posts (title, slug, subtitle, content, excerpt) VALUES (?, ?, ?, ?, ?)`,
    ).run(
      'Dlaczego napisałem bloga',
      'dlaczego-napisalem-bloga',
      'Słowo wstępu o motywacji',
      '# Dlaczego blog?\n\nPiszę bloga, bo lubię dzielić się wiedzą. To dobry sposób na dokumentowanie swojej pracy i naukę.\n\n> "Najlepszy sposób na naukę to nauczanie kogoś innego."',
      'O mojej drodze do tworzenia treści.',
    );

    console.log('✅ DB initialized with 2 sample posts');
  } else {
    console.log('✅ DB already initialized, skipping seed');
  }

  sqlite.close();
}

initDb();
