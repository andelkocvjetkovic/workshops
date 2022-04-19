import Typography from '@mui/material/Typography';
import CalendarIcon from '@app/components/icons/CalendarIcon';
import { getDate, getTime } from '@app/utils/time-utils';
import ClockIcon from '@app/components/icons/ClockIcon';
import Stack from '@mui/material/Stack';

function WorkshopTimeInfo({ date }) {
  return (
    <Stack direction='row' columnGap={{ xs: 1 }}>
      <Typography variant='h6' display='flex' alignItems='center' columnGap={0.5} color='grey.darker'>
        <CalendarIcon />
        {getDate(date)}
      </Typography>
      <Typography variant='h6' display='flex' alignItems='center' columnGap={0.5} color='grey.darker'>
        <ClockIcon />
        {getTime(date)}
      </Typography>
    </Stack>
  );
}

export default WorkshopTimeInfo;
