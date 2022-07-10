import { CHECKOUT_FIELDS } from '@app/utils/form-fields';
import Grid from '@mui/material/Grid';
import TextField from '@app/components/form-fields/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SelectField from '@app/components/form-fields/SelectField';
import CheckboxField from '@app/components/form-fields/CheckboxField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutSchema } from '@app/utils/yupSchemas';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import { ACTION_CART_RESET } from '@app/store/storeActions';
import { selectCart } from '@app/store/reducers/cartSlice';
import { ApiActionPostOrder } from '@app/api/apiActions';
import Result from 'folktale/result';
import { tryAsync } from '@app/utils/tryAsync';

function CheckoutForm({ onSuccessOrder }) {
  const {
    control,
    handleSubmit: formSubmit,
    formState: { isSubmitting },
  } = useForm({
    shouldFocusError: false,
    mode: 'onSubmit',
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      [CHECKOUT_FIELDS.I_AGREE.apiValue]: false,
      [CHECKOUT_FIELDS.FIRST_NAME.apiValue]: '',
      [CHECKOUT_FIELDS.LAST_NAME.apiValue]: '',
      [CHECKOUT_FIELDS.EMAIL.apiValue]: '',
      [CHECKOUT_FIELDS.DATE_BIRTH.apiValue]: '',
      [CHECKOUT_FIELDS.GENDER.apiValue]: '',
      [CHECKOUT_FIELDS.ADDRESS.apiValue]: '',
      [CHECKOUT_FIELDS.ZIP_CODE.apiValue]: '',
    },
  });
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  async function handleSubmit(data) {
    const res = await cart.cata({
      Filled: products =>
        tryAsync(() =>
          ApiActionPostOrder({ ...data, products })
            .run()
            .promise()
        ),
      Empty: () => Result.Error('Sorry but you cannot make a purchase with an empty cart'),
    });
    res.matchWith({
      Ok: ({ value }) => {
        console.log(value);
        dispatch({ type: ACTION_CART_RESET });
        onSuccessOrder();
      },
      Error: ({ value }) => alert(value),
    });
  }

  function handleError(errors) {
    console.log(errors);
  }

  return (
    <Stack component='form' spacing={4} mt={4} onSubmit={formSubmit(handleSubmit, handleError)}>
      <TextField
        isLoading={isSubmitting}
        id={CHECKOUT_FIELDS.FIRST_NAME.apiValue}
        label={CHECKOUT_FIELDS.FIRST_NAME.label}
        placeholder='Type your first name here'
        control={control}
      />
      <TextField
        isLoading={isSubmitting}
        id={CHECKOUT_FIELDS.LAST_NAME.apiValue}
        label={CHECKOUT_FIELDS.LAST_NAME.label}
        placeholder='Type your last name here'
        isInvalid
        errorMessage='Last name contains invalid symbol'
        control={control}
      />
      <TextField
        isLoading={isSubmitting}
        id={CHECKOUT_FIELDS.EMAIL.apiValue}
        label={CHECKOUT_FIELDS.EMAIL.label}
        placeholder='Please type your email address here'
        control={control}
      />
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        rowSpacing={{ xs: 4, md: 0 }}
        columnGap={{ xs: 0, md: 4 }}
        flexWrap='nowrap'
      >
        <Grid item xs={12} md={6}>
          <TextField
            isLoading={isSubmitting}
            label={CHECKOUT_FIELDS.DATE_BIRTH.label}
            id={CHECKOUT_FIELDS.DATE_BIRTH.apiValue}
            type='date'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            isLoading={isSubmitting}
            label={CHECKOUT_FIELDS.GENDER.label}
            id={CHECKOUT_FIELDS.GENDER.apiValue}
            placeholder='Choose your gender'
            control={control}
          >
            <option defaultValue disabled hidden value=''>
              Choose your gender
            </option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='other'>Other</option>
          </SelectField>
        </Grid>
      </Grid>
      <TextField
        isLoading={isSubmitting}
        label={CHECKOUT_FIELDS.ADDRESS.label}
        id={CHECKOUT_FIELDS.ADDRESS.apiValue}
        placeholder='Type your address here'
        control={control}
      />
      <TextField
        isLoading={isSubmitting}
        label={CHECKOUT_FIELDS.ZIP_CODE.label}
        id={CHECKOUT_FIELDS.ZIP_CODE.apiValue}
        placeholder='eg. 21310'
        control={control}
      />
      <CheckboxField
        isLoading={isSubmitting}
        label={CHECKOUT_FIELDS.I_AGREE.label}
        id={CHECKOUT_FIELDS.I_AGREE.apiValue}
        control={control}
      />
      <Button type='submit' variant='contained' size='large' sx={{ width: { xs: '100%', md: '170px' } }} disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={36} color='secondary' /> : 'Checkout'}
      </Button>
    </Stack>
  );
}

CheckoutForm.propTypes = {
  onSuccessOrder: PropTypes.func,
};

export default CheckoutForm;
