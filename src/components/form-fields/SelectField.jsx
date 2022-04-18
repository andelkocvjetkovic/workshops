import { FormControl, FormHelperText, InputLabel, Select, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StyledInput } from '@app/components/form-fields/TextField';
import { css } from '@mui/material/styles';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

const StyledSelect = styled(Select)(
  ({ theme, value }) => css`
    color: ${!value ? theme.palette.grey.light : theme.palette.grey.darker};

    & .MuiNativeSelect-select.MuiInputBase-input.MuiInput-input:focus {
      background: ${theme.palette.grey.lighter};
    }
  `
);

function SelectField({ id, isRequired, label, children, control, isLoading }) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name: id,
    control,
  });
  return (
    <FormControl variant='standard' color='secondary' fullWidth disabled={isLoading}>
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
      <StyledSelect input={<StyledInput error={invalid} />} native value={value} onChange={onChange}>
        {children}
      </StyledSelect>
    </FormControl>
  );
}

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isLoading: PropTypes.bool,
};
export default SelectField;
