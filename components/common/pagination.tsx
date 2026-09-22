import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type PaginationProps = {
  totalDataLength: number;
  lengthPerPage: number;
  currentPage: number;
  updateCurrenPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalDataLength,
  lengthPerPage,
  currentPage,
  updateCurrenPage,
}) => {
  const totalpageCount = Math.ceil(totalDataLength / lengthPerPage);

  return (
    <div className="w-full py-4">
      <div className="flex w-full justify-end items-start gap-4">
        <div
          onClick={() => updateCurrenPage(currentPage - 1)}
          className={`${
            currentPage === 1 ? "pointer-events-none opacity-40" : ""
          } flex items-center justify-center gap-2 custom-dynamicButton-hover-classes border text-sm font-normal border-teal-500 rounded-sm px-4 py-2 bg-white`}
        >
          <span>Previous</span>
        </div>

        <div className="flex max-w-200 gap-3 overflow-auto">
          {Array.from({ length: totalpageCount }, (_, i) => (
            <div
              key={i}
              onClick={() => updateCurrenPage(i + 1)}
              className={`${
                i + 1 === currentPage
                  ? "bg-gradient text-white"
                  : "hover:bg-cyan-200"
              } border cursor-pointer custom-dynamicButton-hover-classes flex items-center justify-center h-9 w-9 min-w-max p-2 rounded-sm`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div
          onClick={() => updateCurrenPage(currentPage + 1)}
          className={`${
            currentPage === totalpageCount
              ? "pointer-events-none opacity-30"
              : ""
          } flex items-center justify-center gap-2 custom-dynamicButton-hover-classes border text-sm font-normal border-teal-500 rounded-sm px-4 py-2 bg-white`}
        >
          <span>Next</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
