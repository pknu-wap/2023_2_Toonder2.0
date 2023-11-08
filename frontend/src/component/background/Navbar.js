import React from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import styled from 'styled-components'; // Import styled from styled-components

const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #fff;
  padding: 10px;
  width: 100%;
`;

const NavbarIcons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 16px;
  font-size: 18px;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarIcons>
        <Icon>
          <FaSearch />
        </Icon>
        <Icon>
          <FaBars />
        </Icon>
      </NavbarIcons>
    </NavbarContainer>
  );
}

export default Navbar;
