import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import WorkshopTimeInfo from '@app/components/workshop-card/utils/WorkshopTimeInfo';
import { FILTERS } from '@app/utils/types';
import { styled } from '@mui/material';
import { css } from '@mui/material/styles';
import WorkshopCategoryIcon from '@app/components/workshop-card/utils/WorkshopCategoryIcon';

const CategoryIconWrapper = styled(WorkshopCategoryIcon)(
  ({ theme }) => css`
    right: 12px;
    top: 0;
    left: auto;
    transform: translateY(-50%);
    ${theme.breakpoints.up('sm')} {
      position: static;
      transform: translateY(0);
    }
  `
);

function TimeInfo({ date, category }) {
  return (
    <Box display='flex' position='relative' pt={2.5} ml={2} justifyItems='center' columnGap={{ sm: 2.5 }}>
      <CategoryIconWrapper category={category} />
      <WorkshopTimeInfo date={date} />
    </Box>
  );
}

TimeInfo.propTypes = {
  date: PropTypes.string,
  category: PropTypes.oneOf(Object.values(FILTERS)),
};
export default TimeInfo;
