import React from "react";
import styled from "styled-components";

function Pagination({ total, limit, page, setPageNum }) {
  const numPages = Math.ceil(total / limit);
  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, numPages);

  return (
    <Nav>
      <Button onClick={() => setPageNum(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <Button
          key={startPage + i}
          onClick={() => setPageNum(startPage + i)}
          aria-current={page === startPage + i ? "page" : undefined}
        >
          {startPage + i}
        </Button>
      ))}
      <Button onClick={() => setPageNum(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  font-family: "NIXGONM-Vb";
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: none;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.paginationHover};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: ${({ theme }) => theme.paginationDefault};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-family: "NIXGONB-Vb-B";
    background: none;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
