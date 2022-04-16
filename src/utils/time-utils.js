import dayjs from 'dayjs';

// getDate :: string -> string
export const getDate = date => dayjs(date).format('D.M.YYYY');

//getTime :: string -> string
export const getTime = date => dayjs(date).format('HH:mm');
