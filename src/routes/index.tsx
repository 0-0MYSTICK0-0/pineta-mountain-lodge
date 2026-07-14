import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import carpaccio from "@/assets/carpaccio.jpg.asset.json";
import gnocchetti from "@/assets/gnocchetti.jpg.asset.json";
import spezzatinoRavioli from "@/assets/spezzatino-ravioli.jpg.asset.json";
import brasatoPolenta from "@/assets/brasato-polenta.jpg.asset.json";
import crespelle from "@/assets/crespelle.jpg.asset.json";
import cannelloni from "@/assets/cannelloni.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "+39 371 135 3271";
const PHONE_HREF = "tel:+393711353271";
const ADDRESS = "Via Chiara Pace, 28857 Santa Maria Maggiore (VB), Italia";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Bistrot La Pineta, Via Chiara Pace, Santa Maria Maggiore VB");

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function TopoLines({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const y = 40 + i * 34;
          const amp = 22 + (i % 4) * 8;
          const d = `M -20 ${y} C 200 ${y - amp}, 400 ${y + amp}, 600 ${y - amp / 1.5} S 1000 ${y + amp}, 1220 ${y - amp / 2}`;
          return <path key={i} d={d} opacity={0.35 - i * 0.012} />;
        })}
      </g>
    </svg>
  );
}

function Peaks({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 300"
      className={className}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="peakGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--pine)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--pine-deep)" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="peakGrad2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--pine-deep)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--pine-deep)" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* back range */}
      <path
        d="M0 220 L90 150 L150 180 L230 110 L310 170 L390 120 L470 175 L560 130 L640 180 L720 140 L800 200 L800 300 L0 300 Z"
        fill="url(#peakGrad)"
        opacity="0.55"
      />
      {/* front range */}
      <path
        d="M0 260 L70 210 L140 240 L210 180 L290 235 L370 190 L450 240 L540 200 L620 245 L710 210 L800 250 L800 300 L0 300 Z"
        fill="url(#peakGrad2)"
      />
      {/* snow caps */}
      <path
        d="M225 118 L230 110 L242 128 L237 130 Z M385 128 L390 120 L402 138 L397 140 Z M555 138 L560 130 L572 148 L567 150 Z"
        fill="var(--cream)"
        opacity="0.85"
      />
    </svg>
  );
}

function PineSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2 L12 22" />
      <path d="M12 5 L7 8 M12 5 L17 8" />
      <path d="M12 9 L6 12 M12 9 L18 12" />
      <path d="M12 13 L5 16 M12 13 L19 16" />
      <path d="M12 17 L7 19 M12 17 L17 19" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.7 5.9 21.2l1.5-6.9L2.2 9.6l6.9-.7L12 2.5z" />
    </svg>
  );
}

function Index() {
  const rootRef = useReveal();

  const chips = ["Bar caffè", "Colazioni", "Aperitivi", "Consumazione sul posto"];

  const dishes = [
    { src: carpaccio.url, title: "Carpaccio di manzo", note: "scaglie, rucola, olio buono", span: "md:row-span-2" },
    { src: cannelloni.url, title: "Cannelloni al ragù", note: "besciamella, forno, tovaglia a quadretti", span: "" },
    { src: gnocchetti.url, title: "Gnocchetti al grano saraceno", note: "burro fuso e sapore di montagna", span: "" },
    { src: brasatoPolenta.url, title: "Brasato con polenta", note: "cottura lenta, polenta gialla", span: "md:row-span-2" },
    { src: crespelle.url, title: "Crespelle in bianco", note: "panna, parmigiano, pepe", span: "" },
    { src: spezzatinoRavioli.url, title: "Spezzatino e ravioli", note: "un tavolo, due piatti, un bicchiere di rosso", span: "" },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#top" className="flex items-center gap-2 text-cream">
            <PineSprig className="h-6 w-6 text-amber-brass" />
            <span className="font-display text-lg tracking-tight">La Pineta</span>
          </a>
          <nav className="hidden gap-8 text-sm text-cream/80 md:flex">
            <a href="#atmosfera" className="hover:text-amber-glow transition-colors">Atmosfera</a>
            <a href="#cucina" className="hover:text-amber-glow transition-colors">Cucina</a>
            <a href="#visita" className="hover:text-amber-glow transition-colors">Visita</a>
            <a href="#recensioni" className="hover:text-amber-glow transition-colors">Recensioni</a>
          </nav>
          <a
            href={PHONE_HREF}
            className="rounded-full border border-cream/30 px-4 py-2 text-sm text-cream backdrop-blur hover:border-amber-glow hover:text-amber-glow transition-colors"
          >
            Chiama
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative isolate overflow-hidden"
        style={{ background: "linear-gradient(180deg, var(--pine-deep) 0%, var(--pine) 100%)" }}
      >
        <div className="absolute inset-0 text-amber-glow/40 mix-blend-screen pointer-events-none">
          <TopoLines className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-56 md:pt-48 md:pb-72">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8" data-reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cream/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" />
              Santa Maria Maggiore · Val Vigezzo
            </div>

            <h1 className="font-display text-5xl leading-[1.02] text-cream sm:text-6xl md:text-7xl lg:text-8xl">
              Bistrot
              <br />
              <span className="italic text-amber-glow">La Pineta</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85 md:text-xl">
              Un piccolo bar caffè tra i pini e le montagne dell'Ossola. Un
              sorso di calore alpino, dal mattino all'ora dell'aperitivo.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-brass px-6 py-3 text-sm font-semibold text-pine-deep shadow-lg shadow-black/20 transition-all hover:bg-amber-glow hover:shadow-xl"
              >
                Come raggiungerci
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold text-cream hover:border-amber-glow hover:text-amber-glow transition-colors"
              >
                Chiama ora
              </a>

              <div className="ml-0 flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-sm text-cream/90 backdrop-blur sm:ml-2">
                <span className="flex text-amber-glow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                </span>
                <span className="font-semibold">5.0</span>
                <span className="text-cream/60">· 2 recensioni Google</span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:col-span-4 md:block" data-reveal>
            <div className="absolute -top-6 -right-4 h-72 w-72 rounded-full bg-amber-glow/20 blur-3xl" aria-hidden />
            <div className="relative rotate-[3deg] overflow-hidden rounded-3xl border border-cream/15 shadow-2xl shadow-black/40 ring-1 ring-amber-glow/20">
              <img
                src={carpaccio.url}
                alt="Un carpaccio servito al Bistrot La Pineta"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 -rotate-[5deg] overflow-hidden rounded-2xl border border-cream/15 shadow-xl shadow-black/40 ring-1 ring-amber-glow/20">
              <img
                src={crespelle.url}
                alt="Crespelle in bianco"
                className="h-40 w-40 object-cover"
              />
            </div>
          </div>
          </div>
        </div>

        {/* peaks silhouette at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <Peaks className="h-40 w-full md:h-56" />
        </div>
      </section>

      {/* ATMOSFERA */}
      <section id="atmosfera" className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-5 md:py-32">
          <div className="md:col-span-2" data-reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pine">
              <PineSprig className="h-4 w-4" />
              Atmosfera
            </p>
            <h2 className="font-display text-4xl leading-tight text-pine-deep md:text-5xl">
              Un rifugio caldo, <span className="italic">in mezzo ai pini</span>.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/85 md:col-span-3" data-reveal>
            <p>
              La Pineta è un piccolo bistrot nel cuore di Santa Maria Maggiore,
              il paese di pietra e legno che veglia sulla Val Vigezzo. Un
              posto semplice, curato, dove il profumo del caffè si mescola a
              quello della resina appena fuori dalla porta.
            </p>
            <p>
              Ci si ferma al mattino per una colazione lenta, a metà giornata
              per un caffè in piedi al bancone, la sera per un aperitivo con
              chi è appena sceso dai sentieri o chi il paese lo abita da
              sempre. Niente di finto, niente di gridato — solo un'accoglienza
              di montagna, autentica e discreta.
            </p>

            <ul className="flex flex-wrap gap-2 pt-2">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-pine/20 bg-parchment px-4 py-1.5 text-sm text-pine-deep"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VISITA */}
      <section
        id="visita"
        className="relative overflow-hidden"
        style={{ background: "var(--parchment)" }}
      >
        <div className="absolute inset-0 text-pine/10 pointer-events-none">
          <TopoLines className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-16 max-w-2xl" data-reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pine">
              <PineSprig className="h-4 w-4" />
              Visita
            </p>
            <h2 className="font-display text-4xl leading-tight text-pine-deep md:text-5xl">
              Dove trovarci, come raggiungerci.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article
              className="group flex flex-col justify-between rounded-2xl border border-pine/15 bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              data-reveal
            >
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-pine-deep text-amber-glow">
                  {/* pin */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                </div>
                <h3 className="font-display text-2xl text-pine-deep">Indirizzo</h3>
                <p className="mt-3 leading-relaxed text-foreground/80">
                  Via Chiara Pace
                  <br />
                  28857 Santa Maria Maggiore (VB)
                  <br />
                  Piemonte, Italia
                </p>
              </div>
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-deep hover:text-amber-brass transition-colors"
              >
                Apri in Google Maps <span aria-hidden>↗</span>
              </a>
            </article>

            <article
              className="group flex flex-col justify-between rounded-2xl border border-pine/15 bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              data-reveal
            >
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-pine-deep text-amber-glow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9Z"/></svg>
                </div>
                <h3 className="font-display text-2xl text-pine-deep">Telefono</h3>
                <p className="mt-3 leading-relaxed text-foreground/80">
                  Chiamaci per una prenotazione o per sapere se siamo aperti.
                </p>
                <p className="mt-3 font-display text-xl text-pine-deep">{PHONE}</p>
              </div>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-deep hover:text-amber-brass transition-colors"
              >
                Chiama ora <span aria-hidden>↗</span>
              </a>
            </article>

            <article
              className="group flex flex-col justify-between rounded-2xl border border-pine/15 bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              data-reveal
            >
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-pine-deep text-amber-glow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                </div>
                <h3 className="font-display text-2xl text-pine-deep">Orari</h3>
                <p className="mt-3 leading-relaxed text-foreground/80">
                  Non abbiamo ancora pubblicato gli orari ufficiali.
                  Un salto di telefono e ti diciamo se la porta è aperta e
                  la macchina del caffè è accesa.
                </p>
              </div>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-deep hover:text-amber-brass transition-colors"
              >
                Chiedi gli orari <span aria-hidden>↗</span>
              </a>
            </article>
          </div>

        </div>
      </section>

      {/* CUCINA / GALLERIA */}
      <section id="cucina" className="relative overflow-hidden bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pine">
                <PineSprig className="h-4 w-4" />
                In cucina
              </p>
              <h2 className="font-display text-4xl leading-tight text-pine-deep md:text-5xl">
                Piatti semplici, <span className="italic">gesti antichi</span>.
              </h2>
            </div>
            <p className="max-w-md text-foreground/75 md:text-right">
              Cucina di casa, di stagione e di valle. Ravioli tirati a mano,
              brasati che cuociono piano, un carpaccio quando è la giornata giusta.
            </p>
          </div>

          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {dishes.map((d, i) => (
              <figure
                key={d.src}
                data-reveal
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`group relative overflow-hidden rounded-2xl bg-pine-deep shadow-lg shadow-pine-deep/10 ring-1 ring-pine/10 ${d.span}`}
              >
                <img
                  src={d.src}
                  alt={d.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/85 via-pine-deep/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="font-display text-lg leading-tight md:text-xl">{d.title}</p>
                  <p className="mt-1 text-xs text-cream/75 md:text-sm">{d.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm italic text-foreground/60" data-reveal>
            Il menù cambia con le stagioni. Chiama per sapere cosa c'è oggi in cucina.
          </p>
        </div>
      </section>

      {/* RECENSIONI */}
      <section id="recensioni" className="relative overflow-hidden bg-background">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4" data-reveal>
              <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-pine">
                <PineSprig className="h-4 w-4" />
                Recensioni
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl text-pine-deep leading-none">5.0</span>
                <span className="text-foreground/60">/ 5</span>
              </div>
              <div className="mt-3 flex text-amber-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" />
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/70">
                Basato su 2 recensioni pubblicate su Google.
              </p>
            </div>

            <div className="grid gap-6 md:col-span-8">
              {[
                {
                  quote:
                    "Federica è una persona fantastica e professionale, sempre attenta alle esigenze della clientela. Martina è molto brava e seria nel suo lavoro.",
                  name: "Stefania Vescio",
                  meta: "Recensione Google",
                },
                {
                  quote:
                    "Molto accogliente: ci siamo divertiti tanto e abbiamo mangiato molto bene.",
                  name: "Ergys Estrefi",
                  meta: "Local Guide · Google",
                },
              ].map((r) => (
                <figure
                  key={r.name}
                  data-reveal
                  className="relative rounded-2xl border border-pine/15 bg-parchment p-8 md:p-10"
                >
                  <span
                    aria-hidden
                    className="absolute -top-4 left-8 font-display text-6xl leading-none text-amber-brass"
                  >
                    "
                  </span>
                  <blockquote className="font-display text-xl leading-relaxed text-pine-deep md:text-2xl">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 text-sm">
                    <span className="font-semibold text-pine-deep">{r.name}</span>
                    <span className="h-1 w-1 rounded-full bg-pine/40" />
                    <span className="text-foreground/60">{r.meta}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / FINAL CTA */}
      <footer
        className="relative overflow-hidden text-cream"
        style={{ background: "var(--pine-deep)" }}
      >
        <div className="absolute inset-0 text-amber-glow/25 pointer-events-none">
          <TopoLines className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-end" data-reveal>
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-glow">
                <PineSprig className="h-4 w-4" />
                Ci vediamo presto
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Vieni a berti un caffè <span className="italic text-amber-glow">tra i pini</span>.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full bg-amber-brass px-6 py-3 text-sm font-semibold text-pine-deep hover:bg-amber-glow transition-colors"
              >
                Come raggiungerci
              </a>
              <a
                href={PHONE_HREF}
                className="rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold hover:border-amber-glow hover:text-amber-glow transition-colors"
              >
                {PHONE}
              </a>
            </div>
          </div>

          <hr className="my-12 border-cream/15" />

          <div className="grid gap-8 text-sm text-cream/70 md:grid-cols-3">
            <div>
              <p className="font-display text-lg text-cream">Bistrot La Pineta</p>
              <p className="mt-1">Bar caffè · Consumazione sul posto</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.18em] text-xs text-amber-glow/80">Dove</p>
              <p className="mt-2">{ADDRESS}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.18em] text-xs text-amber-glow/80">Contatti</p>
              <p className="mt-2">
                <a href={PHONE_HREF} className="hover:text-amber-glow">{PHONE}</a>
              </p>
            </div>
          </div>

          <p className="mt-12 text-xs text-cream/40">
            © {new Date().getFullYear()} Bistrot La Pineta · Santa Maria Maggiore, Val Vigezzo
          </p>
        </div>
      </footer>
    </div>
  );
}
