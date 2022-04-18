import * as yup from 'yup';
import { CHECKOUT_FIELDS } from '@app/utils/form-fields';
import dayjs from 'dayjs';

export const checkoutSchema = yup.object().shape({
  [CHECKOUT_FIELDS.FIRST_NAME.apiValue]: yup.string().trim().required('Please type your first name'),
  [CHECKOUT_FIELDS.LAST_NAME.apiValue]: yup.string().trim().required('Please type your last name'),
  [CHECKOUT_FIELDS.EMAIL.apiValue]: yup
    .string()
    .email('Please type a valid email address')
    .required('Please type your email address'),
  [CHECKOUT_FIELDS.DATE_BIRTH.apiValue]: yup
    .string()
    .test('min-date', 'Please type a valid date', value => dayjs(value).isBefore(dayjs()))
    .required('Please type your birth date'),
  [CHECKOUT_FIELDS.GENDER.apiValue]: yup.string().required('Please choose your gender'),
  [CHECKOUT_FIELDS.ADDRESS.apiValue]: yup.string().trim().required('Please type your address'),
  [CHECKOUT_FIELDS.ZIP_CODE.apiValue]: yup
    .number()
    .typeError('You Zip code contains invalid symbols')
    .transform(value => Number(value))
    .required('Please type your ZIP CODE'),
  [CHECKOUT_FIELDS.I_AGREE.apiValue]: yup.bool().test('is-checked', 'Please, first you have to agree', value => value),
});
