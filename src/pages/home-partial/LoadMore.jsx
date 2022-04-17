import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function LoadMore({ onClick, isDisabled, isFilterActive, ...rest }) {
  return (
    <Box {...rest}>
      {isDisabled && (
        <Typography variant='h3' textAlign='center' color='grey.darker'>
          That&apos;s all, currently we have no more workshops to load.
          <br />
          {isFilterActive && (
            <Typography variant='h5' color='secondary.light'>
              Try redefining your filter.
            </Typography>
          )}
        </Typography>
      )}
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
  isFilterActive: PropTypes.bool,
};
export default LoadMore;
