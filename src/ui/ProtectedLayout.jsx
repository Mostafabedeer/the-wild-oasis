import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedLayout({ children }) {
  const navigate = useNavigate();
  // 1. Check if the user is authenticated
  const { isPending, isAuthenticated } = useUser();
  // 2. if not authenticated, redirect to the login page
  useEffect(
    function () {
      if (!isPending && !isAuthenticated) {
        navigate("/login");
      }
      // If the user is authenticated, we don't need to do anything
    },
    [isPending, isAuthenticated, navigate]
  );
  // 3. show spinner while checking authentication
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. if authenticated, render the children
  if (isAuthenticated) return children;
}

export default ProtectedLayout;
