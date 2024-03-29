import { styled, css } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ArrowDownIcon from '@app/components/icons/ArrowDownIcon';
import { FILTERS_ICON } from '@app/components/filter-category/utils/Filter';
import FilterMenuItem from '@app/components/filter-category/utils/FilterMenuItem';
import PropTypes from 'prop-types';
import { FILTERS } from '@app/utils/types';
import Typography from '@mui/material/Typography';

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 180,
    color: theme.palette.grey.darker,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));
const MobileWrapper = styled('div')(
  ({ theme }) => css`
    display: block;

    ${theme.breakpoints.up('md')} {
      display: none;
    }
  `
);

function FilterCategoryMobile({ activeFilter, onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = newActiveFilter => {
    onClick(newActiveFilter);
    handleClose();
  };
  return (
    <MobileWrapper>
      <Button
        id='filter-menu-mobile'
        aria-controls={open ? 'filter-menu-mobile' : undefined}
        aria-haspopup='true'
        color='secondary'
        aria-expanded={open ? 'true' : undefined}
        variant='text'
        disableElevation
        onClick={handleClick}
        startIcon={<ArrowDownIcon />}
        sx={{ minWidth: 180, justifyContent: 'flex-start' }}
      >
        <Typography variant='h5' component='span'>
          {activeFilter}
        </Typography>
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.values(FILTERS).map(f => (
          <FilterMenuItem
            key={f}
            onClick={() => handleItemClick(f)}
            selected={f === activeFilter}
            filterText={f}
            filterIcon={FILTERS_ICON[f]}
          />
        ))}
      </StyledMenu>
    </MobileWrapper>
  );
}

FilterCategoryMobile.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.oneOf(Object.values(FILTERS)).isRequired,
};
export default FilterCategoryMobile;
