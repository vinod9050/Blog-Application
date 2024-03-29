import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate("/account");

  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        {/* <Link to='/account'>LOGOUT</Link> */}
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </Container>
    </Component>
  );
};

export default Header;
