import { styled, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { css } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { getData, getId } from '@app/utils/prop-utils';
import { ApiActionGetWorkshops } from '@app/api/apiActions';
import WorkshopCard from '@app/components/workshop-card/WorkshopCard';
import LoaderPage from '@app/components/loader/LoaderPage';

const RelatedWorkshopsStyled = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.grey.lighter};
    box-shadow: -20px 0 0 ${theme.palette.grey.lighter}, 20px 0 0 ${theme.palette.grey.lighter};

    ${theme.breakpoints.up('sm')} {
      box-shadow: -40px 0 0 ${theme.palette.grey.lighter}, 40px 0 0 ${theme.palette.grey.lighter};
    }

    ${theme.breakpoints.up('md')} {
      box-shadow: -700px 0 0 ${theme.palette.grey.lighter}, 500px 0 0 0px ${theme.palette.grey.lighter};
    }
  `
);

const RelatedWorkshops = ({ workshopId, category }) => {
  const { data: reletedWorkshops, status } = useQuery(
    ['workshop', workshopId, category],
    () =>
      ApiActionGetWorkshops({
        page: 1,
        limit: 3,
        category: category,
        id_ne: workshopId,
      })
        .map(getData)
        .run()
        .promise(),
    {
      enabled: !!category && !!workshopId,
    }
  );

  if (status === 'error')
    return (
      <Typography variant='h4' textAlign='center' py={2}>
        Sorry but we couldn&apos;t load releted workshops
      </Typography>
    );

  if (status === 'loading')
    return (
      <Box py={5}>
        <LoaderPage />
      </Box>
    );

  if (reletedWorkshops.length > 0)
    return (
      <RelatedWorkshopsStyled py={{ xs: 5, xl: 9.5 }}>
        <Typography variant='h2'>Similar Workshops</Typography>
        <Grid container pt={{ xs: 2.5, xl: 4.5 }} spacing={{ xs: 2, sm: 5 }}>
          {reletedWorkshops.map(w => (
            <WorkshopCard key={getId(w)} {...w} />
          ))}
        </Grid>
      </RelatedWorkshopsStyled>
    );

  return null;
};

export default RelatedWorkshops;
