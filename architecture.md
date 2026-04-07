Jako architekt, zaproponuję Ci stos technologiczny (stack) i architekturę, która idealnie balansuje między prostotą a profesjonalnymi standardami. Wykorzystanie **Claude Code** do budowy tego projektu jest świetnym pomysłem, ponieważ narzędzie to doskonale radzi sobie z frameworkami opartymi na TypeScript.

Oto projekt architektury:

### 1. Stos Technologiczny (Tech Stack)

*   **Framework:** **Next.js (App Router)** – Standard rynkowy. Zapewnia SSR (Server Side Rendering) i Static Site Generation, co jest kluczowe dla SEO.
*   **Stylizacja:** **Tailwind CSS** – Pozwala na błyskawiczne stworzenie minimalistycznego interfejsu przy niskiej wadze kodu.
*   **Baza danych i Backend:** **Supabase** (PostgreSQL).
    *   Dlaczego? Claude Code świetnie generuje zapytania do Supabase. Obsłuży komentarze, listę postów i przechowywanie obrazków (Bucket Storage).
*   **Content:** **Markdown (MD/MDX)**. Artykuły przechowujemy w bazie danych jako tekst MD lub w systemie plików (zalecam bazę danych dla łatwości edycji w panelu admina).
*   **Bezpieczeństwo & Captcha:** **Cloudflare Turnstile** – Nowoczesna, niewidoczna i bardziej przyjazna użytkownikowi alternatywa dla Google reCAPTCHA.
*   **Biblioteki pomocnicze:**
    *   `react-markdown`: do renderowania tekstów.
    *   `framer-motion` lub `medium-zoom`: do efektu powiększania zdjęć.
    *   `next-seo` lub wbudowany Metadata API: dla pozycjonowania.

---

### 2. Architektura Systemu

#### A. Model Danych (Baza w Supabase)
1.  **Table `posts`**: `id`, `slug`, `title`, `content` (text/md), `excerpt`, `cover_image`, `created_at`, `is_published`.
2.  **Table `comments`**: `id`, `post_id`, `author_name`, `content`, `created_at`, `is_approved` (dla bezpieczeństwa warto wprowadzić moderację).

#### B. Zarządzanie Treścią (Admin Panel)
Zamiast skomplikowanych CMS-ów, poproś Claude Code o stworzenie chronionej ścieżki `/admin`.
*   Użyj prostego edytora Markdown (np. `react-simplemde-editor`).
*   Integracja z Supabase Storage: Przeciągasz zdjęcie -> przesyła się do chmury -> dostajesz URL do wstawienia w MD.

#### C. Obsługa Obrazów
*   Wykorzystanie komponentu `<Image />` z Next.js (automatyczna optymalizacja formatów do WebP i rozmiarów pod urządzenia mobilne – kluczowe dla Google PageSpeed Insights).

---

### 3. Realizacja Wymagań (Główne Funkcje)

| Wymaganie | Rozwiązanie Techniczne |
| :--- | :--- |
| **Markdown** | Biblioteka `react-markdown` + `remark-gfm` dla obsługi tabel i list. |
| **Powiększanie zdjęć** | Implementacja biblioteki `medium-zoom` – daje efekt "Lightbox" znany z portalu Medium. |
| **Komentarze + Captcha** | Server Action w Next.js przyjmujący dane z formularza, weryfikujący token Cloudflare Turnstile przed zapisem do bazy. |
| **Wielu klientów** | Next.js na Vercel/Netlify z natury skaluje się bezproblemowo (architektura Serverless). |
| **Bezpieczeństwo** | Autoryzacja do panelu admina przez Supabase Auth. Walidacja danych wejściowych (zod). |
| **SEO** | Generowanie dynamicznej mapy strony (`sitemap.xml`), pliku `robots.txt`, oraz JSON-LD (schema.org) dla artykułów. |

---

### 4. Strategia Pracy z Claude Code (Jak promptować?)

Claude Code najlepiej działa, gdy dzielisz pracę na moduły. Oto sugerowana kolejność poleceń:

1.  **Setup:** "Stwórz projekt Next.js z Tailwind CSS i TypeScript. Skonfiguruj podstawową strukturę katalogów dla bloga."
2.  **Baza danych:** "Skonfiguruj połączenie z Supabase. Stwórz schemat bazy danych dla tabeli `posts` i `comments`."
3.  **Renderowanie MD:** "Stwórz stronę artykułu, która pobiera dane z Supabase i renderuje Markdown przy użyciu `react-markdown`. Dodaj obsługę optymalizacji obrazów."
4.  **Admin Panel:** "Stwórz chroniony panel administratora pod `/admin`, który pozwala na dodawanie nowych postów z prostym edytorem tekstowym i uploadem zdjęć do Supabase Storage."
5.  **Komentarze:** "Dodaj sekcję komentarzy pod artykułem. Zintegruj Cloudflare Turnstile do weryfikacji czy użytkownik nie jest botem przed wysłaniem komentarza."

---

### 5. Kluczowe zalety tej architektury:

1.  **Szybkość (Lighthouse 100/100):** Dzięki Next.js i optymalizacji obrazów, strona będzie ładować się błyskawicznie, co jest priorytetem dla Google.
2.  **Minimalizm:** Brak przeładowania ciężkimi frameworkami. Czysty CSS i lekki JS.
3.  **Łatwość utrzymania:** Całość opiera się na usługach zarządzanych (Vercel + Supabase), co oznacza zero zarządzania serwerem.
4.  **Rozwojowość:** Jeśli blog urośnie, bez problemu dodasz tagi, wyszukiwarkę (np. Algolia) czy newsletter.

Czy chciałbyś, abym przygotował konkretne zapytania (prompty) do Claude Code dla któregoś z tych etapów?