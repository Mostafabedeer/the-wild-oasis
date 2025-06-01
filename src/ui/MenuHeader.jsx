import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

const StyledMenuHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function MenuHeader() {
  const navigate = useNavigate();
  return (
    <StyledMenuHeader>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkMode />
      </li>
      <li>
        <Logout />
      </li>
    </StyledMenuHeader>
  );
}

export default MenuHeader;
