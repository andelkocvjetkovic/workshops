import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { ROUTE_HOME } from "@app/pages/routesConstats";
import styled from "@emotion/styled";
import CartButton from "@app/components/cart-button/CartButton";

const BgWrapper = styled.div`
  background-color: ${props => props.theme.palette.primary.light};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.appBar};
`;
const LogoImg = styled.img`
  display: block;
  height: 40px;
  width: 90px;

  ${props => props.theme.breakpoints.up("md")} {
    width: 105px;
    height: 46px;
  }
`;

function Navbar() {
  return (
    <BgWrapper>
      <Container sx={{ py: { xs: 1, md: 2 }, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to={ROUTE_HOME} title="Workshop - Home">
          <LogoImg src="/assets/logo.svg" alt="Logo" />
        </Link>
        <CartButton cartAmount={2} />
      </Container>
    </BgWrapper>
  );
}

export default Navbar;
