import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PageSize } from "../constant/constant";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ numResults }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (numResults <= PageSize) return null;
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const totalPages = Math.ceil(numResults / PageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  function handlePrevious() {
    if (isFirstPage) return;
    const newPage = currentPage - 1;
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }
  function handleNext() {
    if (isLastPage) return;
    const newPage = currentPage + 1;
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span> {(currentPage - 1) * PageSize + 1} </span> to
        <span>{Math.min(currentPage * PageSize, numResults)}</span> of
        <span> {numResults} </span>
        results
      </P>
      <Buttons>
        <PaginationButton disabled={isFirstPage} onClick={handlePrevious}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton disabled={isLastPage} onClick={handleNext}>
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
