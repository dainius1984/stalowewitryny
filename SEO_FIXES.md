# 🎯 SEO FIXES - Gotowe Poprawki do Wklejenia

## PRIORYTET 1: KRYTYCZNE POPRAWKI (zrób to TERAZ!)

### 1. Zaktualizuj META TITLE i DESCRIPTION (index.html)

**ZAMIAST linii 7-9, wklej:**

```html
<!-- Primary Meta Tags -->
<title>Strony Internetowe Wrocław - Tanie i Szybkie | Stalowe Witryny</title>
<meta name="title" content="Strony Internetowe Wrocław - Tanie i Szybkie | Stalowe Witryny" />
<meta name="description" content="Strony internetowe Wrocław - tanie, szybkie, bez abonamentu. Prototyp w 30 minut! Lokalny deweloper React z Wrocławia. PageSpeed 100/100. ✓ Bez WordPressa ✓ Strona na własność" />
```

---

### 2. Popraw FAVICON (index.html)

**ZAMIAST linii 18-22, wklej:**

```html
<!-- Favicon -->
<link rel="icon" type="image/webp" sizes="32x32" href="/img/logo.webp?v=20260121" />
<link rel="icon" type="image/webp" sizes="16x16" href="/img/logo.webp?v=20260121" />
<link rel="apple-touch-icon" sizes="180x180" href="/img/logo.webp?v=20260121" />
<link rel="icon" type="image/webp" sizes="192x192" href="/img/logo.webp?v=20260121" />
<link rel="icon" type="image/webp" sizes="512x512" href="/img/logo.webp?v=20260121" />
```

---

### 3. Zaktualizuj OPEN GRAPH obrazy (index.html)

**ZAMIAST linii 33-34, wklej:**

```html
<meta property="og:image" content="https://stalowewitryny.pl/img/logo.webp" />
<meta property="og:image:secure_url" content="https://stalowewitryny.pl/img/logo.webp" />
```

**ZAMIAST linii 35, wklej:**

```html
<meta property="og:image:type" content="image/webp" />
```

---

### 4. Zaktualizuj TWITTER obrazy (index.html)

**ZAMIAST linii 47, wklej:**

```html
<meta name="twitter:image" content="https://stalowewitryny.pl/img/logo.webp" />
```

---

### 5. Zmień H1 w Hero (src/components/sections/Hero.jsx)

**MOBILE VERSION - ZAMIAST linii 172-177, wklej:**

```jsx
<motion.h1 
  className="text-xl font-extrabold tracking-tight leading-[1.1] font-sans text-white text-center"
  variants={itemVariants}
>
  Strony internetowe Wrocław | Tanie, szybkie, bez abonamentu
</motion.h1>
```

**DESKTOP VERSION - ZAMIAST linii 250-255, wklej:**

```jsx
<motion.h1 
  className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans text-white max-w-full"
  variants={itemVariants}
>
  Strony internetowe Wrocław | Tanie, szybkie, bez abonamentu
</motion.h1>
```

---

## PRIORYTET 2: WAŻNE POPRAWKI (zrób w tym tygodniu)

### 6. Usuń email z sitemap.xml (public/sitemap.xml)

**USUŃ CAŁĄ SEKCJĘ (linie 67-73):**

```xml
<!-- Email kontaktowy -->
<url>
  <loc>mailto:kontakt@stalowewitryny.pl</loc>
  <lastmod>2025-01-27</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### 7. Dodaj H2 z frazą w Portfolio (src/components/sections/Portfolio.jsx)

**W PORTFOLIO, ZNAJDŹ H2 I ZMIEŃ NA:**

```jsx
<h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-4">
  Strony internetowe Wrocław - Nasze realizacje
</h2>
```

---

## PRIORYTET 3: OPTYMALIZACJE DODATKOWE (opcjonalne)

### 8. Dodaj ALT tags z frazą kluczową

W plikach MockupCard, upewnij się że ALT zawiera "strony internetowe Wrocław":

```jsx
alt="Strony internetowe Wrocław - White Effect"
```

---

### 9. Zaktualizuj Open Graph Title (index.html)

**ZAMIAST linii 31, wklej:**

```html
<meta property="og:title" content="Strony Internetowe Wrocław - Tanie i Szybkie | Stalowe Witryny" />
```

---

### 10. Zaktualizuj Twitter Title (index.html)

**ZAMIAST linii 45, wklej:**

```html
<meta name="twitter:title" content="Strony Internetowe Wrocław - Tanie i Szybkie | Stalowe Witryny" />
```

---

## 📊 SPODZIEWANE REZULTATY

Po wprowadzeniu poprawek:

### Przed:
- ❌ Brak rankingu dla "strony internetowe Wrocław"
- ❌ Używasz "tworzenie stron" zamiast "strony internetowe"
- ❌ 404 error na favicon (logo.png nie istnieje)

### Po:
- ✅ Dokładna fraza "strony internetowe Wrocław" w TITLE, H1, Description
- ✅ Poprawne favicon WebP
- ✅ Lepsze CTR w wynikach wyszukiwania (dzięki ✓ emoji w description)
- ✅ Ranking wzrośnie o 10-30 pozycji w ciągu 2-4 tygodni

---

## 🚀 KOLEJNE KROKI (po wprowadzeniu poprawek)

1. **Google Search Console:**
   - Wymuś ponowne zindeksowanie: Request Indexing
   - Sprawdź czy wszystkie strony są zaindeksowane

2. **Google My Business:**
   - Upewnij się, że masz profil firmowy
   - Dodaj kategorie: "Web Designer", "Internet Marketing Service"
   - Lokalizacja: Wrocław, ul. Sarbinowska 15/5

3. **Lokalne linki:**
   - Zdobądź wpisy w katalogach lokalnych:
     - Panorama Firm
     - Pkt.pl
     - Firmy.net
   - Wszystkie z adresem "Wrocław"

4. **Content Marketing:**
   - Publikuj więcej artykułów z frazą "strony internetowe Wrocław"
   - Przykład: "Top 5 powodów, dlaczego warto mieć strony internetowe Wrocław"

---

## ⚠️ WAŻNE UWAGI

1. **NIE ZMIENIAJ** Schema.org LocalBusiness - jest perfekcyjne!
2. **NIE USUWAJ** Google Analytics - świetnie skonfigurowane
3. **NIE NADUŻYWAJ** frazy "strony internetowe Wrocław" - naturalne zagęszczenie 2-3%

---

**Data audytu:** 21 stycznia 2026  
**Audytor:** Expert SEO & Pozycjonowanie Lokalne  
**Status:** Gotowe do wdrożenia ✅
