import { BiSearchAlt } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";

const NoResultFound = ({
  /* title = "  No result found" */
  title = "  Nenašiel sa žiadny výsledok",
  /* description = "We can't find any item matching your search" */
  description = "Nenašli sme žiadnu položku zodpovedajúcu vášmu vyhľadávaniu.",
}) => {
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
          <BiSearchAlt className="w-20 h-20 text-gray-300 animate-pulse" />
          <IoCloseCircleOutline className="w-8 h-8 text-gray-300 animate-pulse absolute bottom-2 right-2" />
        </div>

        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>

        <p className="text-sm lg:text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default NoResultFound;
