import { SearchX } from "lucide-react";

const NoResultFound = ({
  /* title = "  No result found" */
  title = "Nenašiel sa žiadny výsledok",
  /* description = "We can't find any item matching your search" */
  description = "Nenašli sme žiadnu položku zodpovedajúcu vášmu vyhľadávaniu.",
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-background-color">
          <SearchX className="size-6 text-base-color/50" />
        </span>

        <h2 className="mb-2 text-lg lg:text-xl font-semibold text-base-color">{title}</h2>

        <p className="text-sm lg:text-base leading-relaxed text-base-color/60">{description}</p>
      </div>
    </div>
  );
};

export default NoResultFound;
