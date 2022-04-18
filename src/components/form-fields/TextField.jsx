import { FormControl, FormHelperText, Input, InputLabel, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { css } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

export const StyledInput = styled(Input)(
  ({ theme, value }) => css`
    font-size: ${theme.typography.pxToRem(18)};
    padding: 0 0.5rem;
    margin-top: 5px;

    & .MuiInput-input[type='date'] {
      color: ${!value ? theme.palette.grey.light : theme.palette.grey.darker};
    }

    &.Mui-focused {
      background-color: ${theme.palette.grey.lighter};
    }
  `
);

function TextField({ id, label, isRequired, placeholder, type = 'text', control }) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name: id,
    control,
  });

  return (
    <FormControl variant='standard' color='secondary' fullWidth>
      <Grid container alignItems='center' justifyContent='space-between' spacing={1} flexWrap='none'>
        <Grid item xs='auto'>
          <InputLabel htmlFor={id} required={isRequired}>
            {label}
          </InputLabel>
        </Grid>
        <Grid item xs='auto'>
          {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
        </Grid>
      </Grid>
      <StyledInput
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={invalid}
        type={type}
        inputProps={{
          style: {
            textTransform: type === 'date' ? 'uppercase' : null,
          },
        }}
      />
    </FormControl>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextField;
