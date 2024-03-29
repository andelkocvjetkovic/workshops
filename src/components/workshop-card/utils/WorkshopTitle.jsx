import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function WorkshopTitle({ to, children }) {
  return (
    <Typography
      variant='h4'
      component={Link}
      color='secondary.main'
      sx={{ textDecoration: 'none', ':hover': { textDecoration: 'underline' } }}
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
