import BrushIcon from "@app/components/icons/BrushIcon";
import LayoutIcon from "@app/components/icons/LayoutIcon";
import CodeIcon from "@app/components/icons/CodeIcon";
import FlashIcon from "@app/components/icons/FlashIcon";

/**
 * Filters for  workshops
 * @readonly
 * @enum {string} filter
 */
export const FILTERS = {
  ALL: "all",
  DESIGN: "design",
  FRONTEND: "frontend",
  BACKEND: "backend",
  MARKETING: "marketing"
};

/**
 * Icon for filter
 * @readonly
 * @enum {React~ReactElement} icon
 */
export const FILTERS_ICON = {
  [FILTERS.ALL]: null,
  [FILTERS.DESIGN]: <BrushIcon />,
  [FILTERS.FRONTEND]: <LayoutIcon />,
  [FILTERS.BACKEND]: <CodeIcon />,
  [FILTERS.MARKETING]: <FlashIcon />
};
