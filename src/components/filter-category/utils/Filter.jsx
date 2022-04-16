import BrushIcon from '@app/components/icons/BrushIcon';
import LayoutIcon from '@app/components/icons/LayoutIcon';
import CodeIcon from '@app/components/icons/CodeIcon';
import FlashIcon from '@app/components/icons/FlashIcon';
import { FILTERS } from '@app/utils/types';

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
  [FILTERS.MARKETING]: <FlashIcon />,
};
