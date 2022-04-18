import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Paper } from "@mui/material";

function CheckoutModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex' }}>
      {children}
    </Modal>
  );
}

CheckoutModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default CheckoutModal;
