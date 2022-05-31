import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function LoadMore({ onClick, isDisabled, children, ...rest }) {
  return (
    <Box {...rest}>
      {children}
      <Box display='flex' justifyContent='center'>
        <Button
          disabled={isDisabled}
          variant='text'
          color='secondary'
          sx={{
            color: 'grey.darker',
            flexDirection: 'column',
            px: '2rem',
          }}
          onClick={onClick}
        >
          <Typography variant='h6' component='span'>
            Load more
          </Typography>
          <Box
            component='span'
            role='presentation'
            width='100%'
            height={2}
            bgcolor={() => (isDisabled ? 'rgba(0,0,0,.26)' : 'secondary.main')}
          />
        </Button>
      </Box>
    </Box>
  );
}

LoadMore.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export default LoadMore;
