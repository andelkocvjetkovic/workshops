import { render } from '@app/utils/test-utils';
import CartButton from '@app/components/navbar/utils/cart-button/CartButton';

describe('<CartButton />', () => {
  it('should render without errors', () => {
    render(<CartButton />);
  });
  it('should render amount in cart', () => {
    const { getByText, getByTestId } = render(<CartButton cartAmount={2} />);
    getByText(/^2 workshop in cart$/i);
    getByTestId('cart-eclipse');
  });
  it('should render empty cart', () => {
    const { getByText, queryByTestId } = render(<CartButton cartAmount={0} />);
    getByText(/^Cart is empty$/i);
    expect(queryByTestId('cart-eclipse')).toBe(null);
  });
});
