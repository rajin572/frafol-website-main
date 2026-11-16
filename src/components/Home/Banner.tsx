import Container from "../ui/Container";
import BannerSearch from "./BannerSearch";
import HeroStage from "./HeroStage";

// Home hero: headline + search on the left, the animated "photo shoot" scene on the right.
// The headline is not animated on purpose (LCP element), neither is the photo in the scene.

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f4]">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 size-[420px] rounded-full bg-secondary-color/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 size-[460px] rounded-full bg-third-color/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#ad2b0822 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center py-12 sm:py-16 lg:py-20 lg:min-h-[calc(100vh)]">
          {/* ---------- Text ---------- */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.6rem] font-extrabold leading-[1.15] tracking-tight text-base-color">
              Nájdite si{" "}
              <span className="relative inline-block text-secondary-color">
                fotografa
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-third-color"
                >
                  <path d="M2 9 C 50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              alebo <span className="text-secondary-color">kameramana</span> na každú príležitosť
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-base-color/75 font-medium leading-relaxed">
              Objavte skúsených fotografov a kameramanov z celého Slovenska. Prezrite si ich portfóliá a
              jednoducho si objednajte fotenie alebo natáčanie podľa svojich predstáv.
            </p>

            <div className="hero-fade-up mt-8 w-full max-w-xl" style={{ animationDelay: "0.15s" }}>
              <BannerSearch />
            </div>
          </div>

          {/* ---------- Photo shoot scene ---------- */}
          <div className="lg:col-span-6">
            <HeroStage />
          </div>
        </div>
      </Container>
    </section>
  );
}
