import { IProfessional } from "@/types";
import Link from "next/link";
import React from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import FeaturedProfessionalsCardSlider from "./Card/FeaturedProfessionalsCardSlider";

interface FeaturedProfessionalsCardProps {
  item: IProfessional;
  // Load the card's image eagerly (first cards of a list).
  priority?: boolean;
}

const roleLabel = (role?: string) =>
  role === "both" ? "Fotograf a kameraman" : role === "photographer" ? "Fotograf" : "Kameraman";

// Creator card: portfolio slider on top, name / rating / role / town / price below.
const FeaturedProfessionalsCard: React.FC<FeaturedProfessionalsCardProps> = ({
  item,
  priority = false,
}) => {
  const hasPrice = item?.minHourlyRate || item?.maxHourlyRate;
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-base-color/10 bg-white transition-shadow duration-300 hover:shadow-lg">
      {/* Image/Video Carousel Container */}
      <FeaturedProfessionalsCardSlider item={item} priority={priority} />

      <Link href={`/professionals/${item?._id}`} className="flex grow flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base lg:text-lg font-bold text-base-color line-clamp-1 transition-colors group-hover:text-secondary-color">
            {item?.name}
          </h3>
          {item?.averageRating > 0 && (
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-base-color">
              <Star className="size-3.5 fill-third-color text-third-color" />
              {item?.averageRating?.toFixed(1)}
            </span>
          )}
        </div>

        <span className="mt-1 text-sm text-base-color/60">
          {roleLabel(item?.role)}
        </span>

        {item?.town && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-base-color/60 line-clamp-1">
            <MapPin className="size-3.5 shrink-0" /> {item.town}
          </p>
        )}

        <div aria-hidden className="h-4 shrink-0" />
        <div className="mt-auto flex items-center justify-between border-t border-base-color/10 pt-3">
          {hasPrice ? (
            <p className="text-sm font-medium text-base-color/60">
              <span className="text-base font-semibold text-base-color">
                {item?.minHourlyRate}€ - {item?.maxHourlyRate}€
              </span>
            </p>
          ) : (
            <span />
          )}
          <span className="text-base-color/40 transition-colors group-hover:text-secondary-color">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedProfessionalsCard;
