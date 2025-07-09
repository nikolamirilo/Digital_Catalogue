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
  }) => (
    <button
      className="w-full flex items-center justify-between 
        px-4 py-3 text-xl sm:text-2xl md:text-3xl font-semibold 
        border border-section-border 
        text-section-heading bg-section-bg 
        hover:bg-section-hover 
        rounded-xl shadow-md 
        transition-colors duration-200 group"
      onClick={() => onToggle(code)}
      aria-expanded={isExpanded}
      aria-controls={`section-content-${code}`}
      type="button"
    >
      <span className="truncate font-lora">{title}</span>
      <FiChevronDown
        className={`ml-4 text-3xl transition-transform duration-300 
          text-section-icon ${isExpanded ? "rotate-180" : "rotate-0"}`}
        aria-hidden="true"
      />
    </button>
  );
export default SectionHeader