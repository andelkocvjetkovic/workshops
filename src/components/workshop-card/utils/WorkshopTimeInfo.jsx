import Box from '@mui/material/Box';

function WorkshopTimeInfo({ children }) {
  return (
    <Box display='flex' alignItems='center' columnGap={1} fontSize={{ xs: 12, md: 15 }} fontWeight={700} color='grey.darker'>
      {children}
    </Box>
  );
}

export default WorkshopTimeInfo;
