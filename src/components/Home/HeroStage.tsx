import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { AllImages } from "../../../public/assets/AllImages";

// Hero "photo shoot" scene. A camera viewfinder with a real photo in the middle; the photographer
// (left) takes the picture, the flash fires and the frame blinks white. The videographer (right)
// records it, with REC waves coming out of his lens. Both characters link to their category page.
//
// Everything is positioned in % of one aspect-ratio box, so the same scene scales from phone to desktop.
// Animations live in globals.css (hero-*) and switch off with prefers-reduced-motion.
// The framed photo is the LCP image: it is `priority` and never starts hidden.

const slideIn = (fromX: number, delay: number) => ({
  initial: { opacity: 0, x: fromX },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

const popIn = (delay: number) => ({
  initial: { opacity: 0, y: 20, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const Corner = ({ className }: { className: string }) => (
  <span aria-hidden className={`absolute size-5 sm:size-7 border-white/90 ${className}`} />
);

export default function HeroStage() {
  return (
    <div className="relative mx-auto aspect-[16/14] w-full max-w-[640px] select-none">
      {/* ---------- Viewfinder with the photo ---------- */}
      <div className="absolute left-[21%] top-[3%] h-[63%] w-[58%] rounded-[22px] sm:rounded-[28px] bg-base-color p-1.5 sm:p-2 shadow-2xl shadow-secondary-color/20">
        <div className="relative h-full w-full overflow-hidden rounded-[17px] sm:rounded-[22px]">
          <Image
            src={AllImages.herobanner}
            alt="Fotografka s fotoaparátom"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 370px, 58vw"
            className="object-cover object-[60%_center]"
          />
          {/* Camera HUD */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          <Corner className="left-3 top-3 border-l-2 border-t-2 rounded-tl-lg" />
          <Corner className="right-3 top-3 border-r-2 border-t-2 rounded-tr-lg" />
          <Corner className="left-3 bottom-3 border-l-2 border-b-2 rounded-bl-lg" />
          <Corner className="right-3 bottom-3 border-r-2 border-b-2 rounded-br-lg" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex size-10 sm:size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-white/80"
          >
            <span className="size-1 rounded-full bg-white" />
          </span>
          <span className="absolute left-4 sm:left-6 top-3.5 sm:top-5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-wider text-white backdrop-blur-sm">
            <span className="size-1.5 sm:size-2 animate-pulse rounded-full bg-red-500" />
            REC
          </span>
          <span aria-hidden className="absolute right-4 sm:right-6 top-3.5 sm:top-5 rounded bg-black/45 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold text-white backdrop-blur-sm">
            4K
          </span>
          <span
            aria-hidden
            className="absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] sm:text-[11px] font-semibold tracking-wide text-white/90"
          >
            ISO 100 · f/2.8 · 1/250
          </span>
          {/* "Photo taken" blink, in sync with the flash */}
          <span aria-hidden className="hero-snap pointer-events-none absolute inset-0 bg-white" />
        </div>
      </div>

      {/* ---------- Polaroid shots (sm and up) ---------- */}
      <motion.div {...popIn(0.5)} className="absolute left-0 top-0 z-10 hidden w-[23%] sm:block">
        <div
          className="hero-drift rounded-xl bg-white p-1.5 pb-0 shadow-xl ring-1 ring-black/5"
          style={{ "--hero-tilt": "-8deg" } as React.CSSProperties}
        >
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={AllImages.aboutUs2} alt="Fotenie v ateliéri" fill placeholder="blur" sizes="150px" className="object-cover" />
          </div>
          <p className="py-1.5 text-center text-[11px] font-bold text-base-color">Fotenie</p>
        </div>
      </motion.div>

      <motion.div {...popIn(0.7)} className="absolute right-0 top-[9%] z-10 hidden w-[21%] sm:block">
        <div
          className="hero-drift-delayed rounded-xl bg-white p-1.5 pb-0 shadow-xl ring-1 ring-black/5"
          style={{ "--hero-tilt": "7deg" } as React.CSSProperties}
        >
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={AllImages.signupuser} alt="Kameraman pri natáčaní" fill placeholder="blur" sizes="140px" className="object-cover object-[30%_center]" />
          </div>
          <p className="py-1.5 text-center text-[11px] font-bold text-base-color">Natáčanie</p>
        </div>
      </motion.div>

      {/* ---------- Photographer (left) ---------- */}
      <motion.div {...slideIn(-60, 0.2)} className="absolute bottom-[4%] left-[-1%] z-20 h-[62%] aspect-[400/769]">
        <Link href="/photography" aria-label="Fotografi" className="group block h-full w-full">
          <span aria-hidden className="absolute -bottom-1 left-1/2 h-3 w-[80%] -translate-x-1/2 rounded-full bg-black/15 blur-[3px]" />
          <div className="hero-bob relative h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
            <Image src={AllImages.girl} alt="Fotografka" fill sizes="(min-width: 1024px) 190px, 30vw" className="object-contain drop-shadow-lg" />
            {/* Flash at the lens */}
            <span
              aria-hidden
              className="hero-flash pointer-events-none absolute left-[83%] top-[31%] size-16 sm:size-24 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#fff6c4_30%,#ffc70066_55%,transparent_72%)]"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-secondary-color px-3 py-1 text-[11px] sm:text-sm font-bold text-white shadow-lg transition group-hover:gap-2">
            Fotografi <ArrowRight className="size-3 sm:size-3.5" />
          </span>
        </Link>
      </motion.div>

      {/* ---------- Videographer (right) ---------- */}
      <motion.div {...slideIn(60, 0.35)} className="absolute bottom-[4%] right-[-1%] z-20 h-[62%] aspect-[400/769]">
        <Link href="/videography" aria-label="Kameramani" className="group block h-full w-full">
          <span aria-hidden className="absolute -bottom-1 left-1/2 h-3 w-[80%] -translate-x-1/2 rounded-full bg-black/15 blur-[3px]" />
          <div className="hero-bob-delayed relative h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
            <Image src={AllImages.male} alt="Kameraman" fill sizes="(min-width: 1024px) 190px, 30vw" className="object-contain drop-shadow-lg" />
            {/* Recording waves out of the lens */}
            <span aria-hidden className="hero-rec-wave pointer-events-none absolute left-[8%] top-[19.5%] size-10 sm:size-14 rounded-full border-2 border-secondary-color/70" />
            <span aria-hidden className="hero-rec-wave-delayed pointer-events-none absolute left-[8%] top-[19.5%] size-10 sm:size-14 rounded-full border-2 border-secondary-color/70" />
          </div>
          <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-secondary-color px-3 py-1 text-[11px] sm:text-sm font-bold text-white shadow-lg transition group-hover:gap-2">
            Kameramani <ArrowRight className="size-3 sm:size-3.5" />
          </span>
        </Link>
      </motion.div>

      {/* ---------- Booking card (sm and up) ---------- */}
      <motion.div
        {...popIn(0.9)}
        className="absolute bottom-[9%] left-1/2 z-10 hidden w-[38%] -translate-x-1/2 sm:block"
      >
        <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
          <span className="flex size-9 lg:size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-color text-white">
            <CalendarCheck className="size-4 lg:size-5" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-xs lg:text-sm font-bold text-base-color">Objednávka online</span>
            <span className="block text-[10px] lg:text-xs text-base-color/60">Vyberte balík, termín a zaplaťte bezpečne</span>
          </span>
        </div>
      </motion.div>

      {/* Accent shape behind the scene */}
      <div aria-hidden className="absolute bottom-[16%] left-1/2 -z-10 size-[45%] -translate-x-1/2 rounded-full bg-third-color/25 blur-2xl" />
    </div>
  );
}
