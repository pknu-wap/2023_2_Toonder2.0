import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import styled from "styled-components"; // Import styled from styled-components
import Sidebar from "./Sidebar";

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
  color: ${({ theme }) => theme.icon};
  margin-right: 16px;
  font-size: 18px;
  cursor: pointer;
`;

export const Navbar = ({ isDarkTheme, setIsDarkTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <NavbarIcons>
          <Icon>
            <FaSearch />
          </Icon>
          <Icon>
            <FaBars onClick={toggleSidebar} />
          </Icon>
        </NavbarIcons>
      </NavbarContainer>

      <Sidebar
        isOpen={sidebarOpen}
        onMenuClick={handleMenuClick}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
    </>
  );
};

export default Navbar;
