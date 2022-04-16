import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SAGA_WORKSHOPS_APPEND } from '@app/store/sagaActions';
import PropTypes from 'prop-types';

function LoadMore({ onClick, isDisabled, isFilterActive, ...rest }) {
  return (
    <Box {...rest}>
      {isDisabled && (
        <Typography variant='h6' component='h5' textAlign='center' color='grey.darker' fontWeight={700}>
          That's all, currently we have no more workshops to load.
          <br />
          {isFilterActive && <Typography variant='subtitle1'>Try redefining your filter.</Typography>}
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
          Load more
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
