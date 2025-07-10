import { FiChevronDown } from "react-icons/fi";

const SectionHeader = ({
  title,
  code,
  isExpanded,
  onToggle,
}: {
  title: string;
  code: string;
  isExpanded: boolean;
  onToggle: (code: string) => void;
}) => {
  return (
    <button
      onClick={() => onToggle(code)}
      aria-expanded={isExpanded}
      aria-controls={`section-content-${code}`}
      type="button"
      className="w-full group relative flex items-center justify-between 
        px-5 py-4 text-xl sm:text-2xl md:text-3xl font-semibold font-lora 
        text-product-fg bg-product-bg border border-product-border 
        rounded-2xl shadow-md transition-all duration-300 ease-in-out 
        hover:bg-product-hover hover:shadow-xl"
    >
      <span className="relative inline-block">
        <span>{title}</span>

        <span
          className="absolute left-0 -bottom-1 h-[2px] w-0 bg-product-primary 
            transition-all duration-300 group-hover:w-full"
        ></span>
      </span>

      {/* Icon */}
      <FiChevronDown
        className={`ml-4 text-3xl text-product-icon transition-transform duration-300 
          ${isExpanded ? "rotate-180" : "rotate-0"}`}
        aria-hidden="true"
      />
    </button>
  );
};

export default SectionHeader;
