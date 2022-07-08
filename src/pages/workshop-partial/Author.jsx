import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { ApiActionGetUser } from '@app/api/apiActions';
import { getData, getName } from '@app/utils/prop-utils';

function Author({ userId }) {
  const { data: user, status } = useQuery(['user', userId], () => ApiActionGetUser(userId).map(getData).run().promise(), {
    enabled: !!userId,
  });

  return (
    <Typography variant='h5'>
      {status === 'error' ? 'Unknown user' : status === 'loading' ? 'Loading ...' : getName(user)}
    </Typography>
  );
}
export default Author;
