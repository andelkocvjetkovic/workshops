import renderWithProvider from '@app/utils/test-utils';
import CartHeader from '@app/components/cart/utils/CartHeader';
import userEvent from '@testing-library/user-event';

describe('<CartHeader />', () => {
  it('should render without errors', () => {
    renderWithProvider(<CartHeader cartAmount={0} />);
  });
  it('should render empty cart', () => {
    const { getByText } = renderWithProvider(<CartHeader cartAmount={0} />);
    getByText(/^cart is empty$/i);
  });
  it('should render amount products', async () => {
    const { getByText, findByTestId } = renderWithProvider(<CartHeader cartAmount={2} />);
    getByText(/^2 workshops$/i);
    await findByTestId('cart-eclipse');
  });
  it('should close CartHeader', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    const { getByRole } = renderWithProvider(<CartHeader cartAmount={2} onClose={onClose} />);
    await user.click(getByRole('button'));
    expect(onClose).toBeCalledTimes(1);
  });
});
