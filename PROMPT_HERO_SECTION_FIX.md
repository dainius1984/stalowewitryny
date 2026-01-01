# Prompt: Ujednolicenie Hero Section i Sekcji Pod Hero

## Cel
Ujednolicenie rozmiarów hero section i sekcji pod hero w tym projekcie, tak aby wyglądały spójnie w galerii portfolio (zarówno na desktop jak i mobile).

## Wymagania dla Hero Section

### Desktop (≥ 768px):
- **Stała wysokość:** `850px` (nie vh, nie %, dokładnie 850px)
- **Pełna szerokość:** `100vw` lub `width: 100%`
- **Treść wyśrodkowana:** użyj `max-w-7xl` (1280px) z `mx-auto`
- **Padding boczny:** `px-6 md:px-12` (24px mobile, 48px desktop)
- **Wszystko widoczne:** hero section nie powinien wymagać scrollowania - cała treść (nagłówek, tekst, CTA) musi być widoczna w 850px wysokości

### Mobile (< 768px):
- **Wysokość:** `50vh` z `min-height: 350px`
- **Pełna szerokość:** `width: 100%`
- **Padding boczny:** `px-6` (24px)

### Przykładowa struktura Tailwind:
```jsx
<section className="w-full h-[850px] md:h-[850px] flex items-center justify-center bg-[twoje-tlo]">
  <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
    {/* Treść hero */}
  </div>
</section>
```

## Wymagania dla Sekcji Pod Hero

### Desktop (≥ 768px):
- **Padding górny:** `pt-20` (80px) lub `pt-16` (64px)
- **Padding dolny:** `pb-20` (80px) lub `pb-16` (64px)
- **Maksymalna szerokość:** `max-w-7xl` z `mx-auto`
- **Padding boczny:** `px-6 md:px-12`

### Mobile (< 768px):
- **Padding górny:** `pt-12` (48px) lub `pt-16` (64px)
- **Padding dolny:** `pb-12` (48px) lub `pb-16` (64px)
- **Padding boczny:** `px-6`

### Przykładowa struktura Tailwind:
```jsx
<section className="py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
    {/* Treść sekcji */}
  </div>
</section>
```

## Wymagania dla Screenshotów Portfolio

### Desktop Screenshot (dla portfolio gallery):
- **Wymiary:** `1920px × 850px`
- **Co screenshotować:** Tylko hero section (od góry strony do końca hero)
- **Format:** PNG
- **Nazwa:** `[nazwa-projektu]1.png` (np. jeśli projekt to "whiteeffect", to `white1.png`)
- **Lokalizacja:** `/public/img/projects/[nazwa-projektu]1.png`

### Mobile Screenshot (opcjonalnie):
- **Wymiary:** `375px × 1500px`
- **Co screenshotować:** Hero section na mobile
- **Format:** PNG
- **Nazwa:** `[nazwa-projektu]mobile.png`
- **Lokalizacja:** `/public/img/projects/[nazwa-projektu]mobile.png`

## Zadania do Wykonania

1. **Znajdź hero section w tym projekcie:**
   - Sprawdź plik z hero section (może być `Hero.jsx`, `HeroSection.jsx`, `components/Hero.jsx`, etc.)
   - Sprawdź główny layout/App file

2. **Ustaw stałą wysokość 850px na desktop:**
   - Zmień wysokość hero z `vh`, `%` lub innych wartości na dokładnie `850px` na desktop
   - Użyj: `h-[850px] md:h-[850px]` lub `style={{ height: '850px' }}` na desktop
   - Na mobile: `h-[50vh] md:h-[850px]` z `min-h-[350px]`

3. **Upewnij się, że hero zajmuje pełną szerokość:**
   - Użyj `w-full` lub `width: 100%`
   - Nie używaj `max-width` na głównym kontenerze hero

4. **Wyśrodkuj treść hero:**
   - Dodaj `max-w-7xl mx-auto` do kontenera z treścią
   - Dodaj `px-6 md:px-12` dla paddingów bocznych

5. **Sprawdź, czy wszystko mieści się w 850px:**
   - Zmniejsz font-size jeśli trzeba
   - Zmniejsz paddingi jeśli trzeba
   - Zmniejsz odstępy między elementami jeśli trzeba
   - **WAŻNE:** Cała treść hero musi być widoczna bez scrollowania!

6. **Ustaw spójne paddingi w sekcji pod hero:**
   - Znajdź pierwszą sekcję pod hero section
   - Ustaw `py-16 md:py-20` (lub `pt-16 pb-16 md:pt-20 md:pb-20`)
   - Upewnij się, że ma `max-w-7xl mx-auto px-6 md:px-12`

7. **Przetestuj responsywność:**
   - Sprawdź na mobile (< 768px) - hero powinien mieć 50vh
   - Sprawdź na desktop (≥ 768px) - hero powinien mieć dokładnie 850px
   - Sprawdź sekcję pod hero - paddingi powinny być spójne

## Przykładowy Kod Hero Section

```jsx
// Przykład poprawnego hero section
<section className="relative w-full h-[50vh] md:h-[850px] min-h-[350px] flex items-center justify-center bg-gradient-to-br from-[kolor1] to-[kolor2]">
  <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Lewa strona - Tekst */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Twój Nagłówek
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Opis hero section
        </p>
        <button className="px-6 py-3 bg-primary text-white rounded-full">
          CTA Button
        </button>
      </div>
      
      {/* Prawa strona - Obraz (opcjonalnie) */}
      <div className="flex-1">
        <img src="/hero-image.png" alt="Hero" className="w-full h-auto" />
      </div>
    </div>
  </div>
</section>
```

## Checklist Przed Zakończeniem

- [ ] Hero section ma dokładnie **850px wysokości** na desktop
- [ ] Hero section ma **50vh wysokości** na mobile (min 350px)
- [ ] Hero section zajmuje **pełną szerokość** (100%)
- [ ] Treść hero jest **wyśrodkowana** z max-w-7xl
- [ ] **Cała treść hero jest widoczna** bez scrollowania w 850px
- [ ] Sekcja pod hero ma **spójne paddingi** (py-16 md:py-20)
- [ ] Sekcja pod hero ma **max-w-7xl mx-auto**
- [ ] Wszystko działa **responsywnie** na mobile i desktop
- [ ] Screenshot desktop hero: **1920×850px** zapisany jako `[nazwa]1.png`

## Uwagi

- **Nie zmieniaj** treści hero - tylko wymiary i layout
- **Nie zmieniaj** kolorów, fontów, stylów - tylko struktura i wymiary
- Jeśli hero jest za wysoki - **zmniejsz** font-size, paddingi, odstępy
- Jeśli hero jest za niski - **zwiększ** font-size, paddingi, odstępy (ale max 850px!)
- **Priorytet:** Wszystko musi się zmieścić w 850px bez scrollowania!
