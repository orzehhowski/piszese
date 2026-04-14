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
      header_image TEXT,
      is_draft INTEGER DEFAULT 0 NOT NULL,
      created_at INTEGER NOT NULL
      );
      `);
      const existing = sqlite.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
      if (existing.count === 0) {
        sqlite.prepare(
          `INSERT INTO posts (title, slug, subtitle, content, excerpt, header_image, is_draft, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ).run(
          'Mój pierwszy wpis',
          'moj-pierwszy-wpis',
          'Witaj na moim blogu!',
          '# Witaj na moim blogu!\n\nTo jest mój pierwszy wpis. Cieszę się, że tutaj trafiłeś.\n\nW tym blogu będę pisał o:\n- Programowaniu\n- Technologii\n- Różnych ciekawostkach\n\n![Przykładowe zdjęcie](/fotka/grubodziob.jpg)',
          'Pierwszy artykuł na start bloga.',
          '/fotka/grubodziob.jpg',
          0,
          Date.now(),
        );

        sqlite.prepare(
          `INSERT INTO posts (title, slug, subtitle, content, excerpt, header_image, is_draft, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ).run(
          'Dlaczego napisałem bloga',
          'dlaczego-napisalem-bloga',
          'Słowo wstępu o motywacji',
          '# Dlaczego blog?\n\nPiszę bloga, bo lubię dzielić się wiedzą. To dobry sposób na dokumentowanie swojej pracy i naukę.\n\n> "Najlepszy sposób na naukę to nauczanie kogoś innego."',
          'O mojej drodze do tworzenia treści.',
          null,
          0,
          Date.now(),
        );

        sqlite.prepare(
          `INSERT INTO posts (title, slug, subtitle, content, excerpt, header_image, is_draft, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ).run(
          'Tajny projekt w budowie',
          'tajny-projekt',
          'To jest szkic nowego wpisu',
          '# To jest dopiero szkic!\n\nJeszcze nie publikujemy tego wpisu. Muszę dopisać:\n- Więcej detali o technologii\n- Jakieś ładne grafiki\n- Podsumowanie',
          'Szkic artykułu o nowym projekcie.',
          null,
          1, // is_draft = true
          Date.now(),
        );
    console.log('✅ DB initialized with 3 sample posts (including 1 draft)');
  } else {
    console.log('✅ DB already initialized, skipping seed');
  }

  sqlite.close();
}

initDb();
