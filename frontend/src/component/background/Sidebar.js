// Sidebar.js
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-270px")};
  width: ${({ isOpen }) => (isOpen ? "270px" : "0")};
  height: 100%;
  background-color: rgba(51, 51, 51, 0.96);
  transition: right 0.3s ease;
`;

const Menu = styled.div`
  padding: 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

const menuItems = [
  { to: "/", text: "메인" },
  { to: "/login", text: "로그인" },
  { to: "/join/step1", text: "회원가입" },
  { to: "/freeboard", text: "자유게시판" },
  { to: "/mypage", text: "마이페이지" },
  { to: "/", text: "마이웹툰" },
  { to: "/", text: "최근 쓴 글" },
];

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
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
          <Menu onClick={onMenuClick}>{item.text}</Menu>
        </Link>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
