import renderWithProvider from '@app/utils/test-utils';
import CartButton from '@app/components/navbar/utils/cart-button/CartButton';

describe('<CartButton />', () => {
  it('should render without errors', () => {
    renderWithProvider(<CartButton cartAmount={0} />);
  });
  it('should render amount in cart', async () => {
    const { getByText, findByTestId } = renderWithProvider(<CartButton cartAmount={2} />);
    getByText(/^2 workshop in cart$/i);
    await findByTestId('cart-eclipse');
  });
  it('should render empty cart', () => {
    const { getByText, queryByTestId } = renderWithProvider(<CartButton cartAmount={0} />);
    getByText(/^Cart is empty$/i);
    expect(queryByTestId('cart-eclipse')).toBe(null);
  });
});
