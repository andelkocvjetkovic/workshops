import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText, styled } from '@mui/material';
import { css } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import Box from '@mui/material/Box';

const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme }) => css`
    & .MuiFormControlLabel-label {
      font-weight: 600;
      font-size: ${theme.typography.pxToRem(15)};
    }
  `
);

function CheckboxField({ label, id, control,isLoading }) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name: id,
    control,
  });

  return (
    <Box display='flex' alignItems='center'>
      <StyledFormControlLabel

        onChange={onChange}
        checked={value}
        control={<Checkbox disabled={isLoading} id={id} color='secondary' sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }} />}
        label={label}
      />
      {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
    </Box>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};
export default CheckboxField;
