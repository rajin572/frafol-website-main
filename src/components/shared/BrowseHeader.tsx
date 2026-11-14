import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import Revel from "../ui/Animation/Revel";

interface BrowseHeaderProps {
  title: string;
  description?: string;
  // With an image the header is a photo banner (category pages); without one it is a plain band.
  image?: string | StaticImageData;
  // Small text link above the title (e.g. "Späť na kategórie"), plain band only.
  back?: { href: string; label: string };
  // Under the description, centred (e.g. the search box), plain band only.
  children?: React.ReactNode;
}

// Header of the browse pages (/photography, /videography, their categories and /professionals).
const BrowseHeader = ({ title, description, image, back, children }: BrowseHeaderProps) => {
  // Plain band: the list pages, which never had a banner. Centred title, intro and search.
  if (!image) {
    return (
      <section className="border-b border-base-color/10 bg-[#fbf7f4]">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center py-14 text-center sm:py-20">
            {back && (
              <Link
                href={back.href}
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-base-color/60 transition-colors hover:text-secondary-color"
              >
                <ArrowLeft className="size-4" />
                {back.label}
              </Link>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-base-color">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-base lg:text-lg leading-relaxed text-base-color/65">{description}</p>
            )}
            {children && <div className="mt-9 w-full max-w-2xl text-left">{children}</div>}
          </div>
        </Container>
      </section>
    );
  }

  // Photo banner: same look as the old SectionBanner (photo, dark overlay, white title bottom left),
  // but also shown on phones, so no separate mobile title is needed.
  return (
    <section className="relative isolate flex min-h-[340px] sm:min-h-[400px] lg:min-h-[55vh] items-end overflow-hidden bg-base-color select-none">
      <Image
        src={image}
        alt=""
        fill
        priority
        placeholder={typeof image === "string" ? "empty" : "blur"}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/50 to-black/70" />

      <Container>
        <div className="max-w-3xl pb-10 pt-24 sm:pb-12 lg:pb-[4%]">
          <Revel>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-wide text-white">
              {title}
            </h1>
          </Revel>
          {description && (
            <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-white/85">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default BrowseHeader;
