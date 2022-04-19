import Grid from '@mui/material/Grid';

function PageGridLayout({ children, ...rest }) {
  return (
    <Grid container sx={{ pt: { xs: 2, lg: 3 } }} rowSpacing={{ xs: 2 }} columnSpacing={{ md: 1, lg: 2 }} {...rest}>
      {children}
    </Grid>
  );
}

function Left({ children }) {
  return (
    <Grid item xs={12} md={3}>
      {children}
    </Grid>
  );
}

function Right({ children,...rest }) {
  return (
    <Grid item xs={12} md={9} {...rest}>
      {children}
    </Grid>
  );
}

PageGridLayout.Left = Left;
PageGridLayout.Right = Right;

export default PageGridLayout;
