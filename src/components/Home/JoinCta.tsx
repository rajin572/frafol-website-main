import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "../ui/Container";
import { getAuthToken } from "@/lib/getAuthToken";
import { AllImages } from "../../../public/assets/AllImages";

// Call to action for creators, right above the footer. Copy comes from the About us page.
const points = [
  "Získajte nových klientov a prezentujte svoju tvorbu na jednom mieste.",
  "Z ceny, ktorú si stanovíte, vám FRAFOL nič neodpočítava.",
];

// Only for visitors without an account: a logged-in user (client or creator) is never asked to
// register again.
export default async function JoinCta() {
  if (await getAuthToken()) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-2xl bg-secondary-color lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
            <p className="text-sm font-semibold text-third-color">Pre fotografov a kameramanov</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
              Ste fotograf alebo kameraman?
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base sm:text-lg text-white/85">
                  <Check className="mt-1 size-5 shrink-0 text-third-color" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-secondary-color transition-colors hover:bg-background-color"
              >
                Pridajte sa ako fotograf/kameraman
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="text-center text-sm sm:text-base font-semibold text-white underline-offset-4 hover:underline"
              >
                Ako to funguje
              </Link>
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-full">
            <Image
              src={AllImages.aboutUs2}
              alt="Fotograf pri práci v ateliéri"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
