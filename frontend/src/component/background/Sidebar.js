// Sidebar.js
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  height: 100%;
  background-color: rgba(51, 51, 51, 0.96);
  transition: right 0.3s ease;
`;

const Menu = styled.div`
  padding: 20px;
  color: #fff;
  cursor: pointer;
`;

const Sidebar = ({ isOpen, onMenuClick }) => {
  const sidebarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onMenuClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onMenuClick]);

  return (
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Menu>메인</Menu>
      </Link>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Menu onClick={onMenuClick}>로그인</Menu>
      </Link>
      <Link to="/join/step1" style={{ textDecoration: "none" }}>
        <Menu onClick={onMenuClick}>회원가입</Menu>
      </Link>
      <Menu>마이페이지</Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
