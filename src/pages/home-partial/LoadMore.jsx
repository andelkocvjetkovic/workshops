import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SAGA_FETCH_WORKSHOPS } from '@app/store/sagaActions';
import PropTypes from 'prop-types';

function LoadMore({ onClick, isDisabled, ...rest }) {
  return (
    <Box {...rest}>
      {isDisabled && (
        <Typography variant='subtitle2' component='h5' textAlign='center' color='grey.darker' fontWeight={700}>
          That's all, currently we have no more workshops.
        </Typography>
      )}
      <Box display='flex'>
        <Button
          disabled={isDisabled}
          variant='text'
          color='secondary'
          sx={{
            color: 'grey.darker',
            mx: 'auto',
            flexDirection: 'column',
          }}
          onClick={onClick}
        >
          Load more
          <Box
            component='span'
            role='presentation'
            width='100%'
            height={2}
            bgcolor={() => (isDisabled ? 'grey.lighter' : 'secondary.main')}
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
