import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CHECKOUT_FIELDS } from '@app/utils/form-fields';
import Grid from '@mui/material/Grid';

function CheckoutForm() {
  return (
    <Box component='form'>
      <TextField label={CHECKOUT_FIELDS.FIRST_NAME.label} />
      <TextField label={CHECKOUT_FIELDS.LAST_NAME.label} />
      <TextField label={CHECKOUT_FIELDS.EMAIL.label} />
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutForm;
