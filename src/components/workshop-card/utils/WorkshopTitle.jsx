import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function WorkshopTitle({ to, children }) {
  return (
    <Typography
      variant='h6'
      fontWeight={700}
      lineHeight='23px'
      component={Link}
      color='secondary.main'
      sx={{ textDecoration: 'none' }}
      to={to}
      flexGrow={1}
    >
      {children}
    </Typography>
  );
}

WorkshopTitle.propTypes = {
  to: PropTypes.string.isRequired,
};
export default WorkshopTitle;
