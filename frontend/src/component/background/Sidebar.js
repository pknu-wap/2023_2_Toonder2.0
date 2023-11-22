// Sidebar.js
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabase";
import { useAuth } from "../../AuthContext";

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-270px")};
  width: ${({ isOpen }) => (isOpen ? "270px" : "0")};
  height: 100%;
  background-color: rgba(30, 30, 30, 0.95);
  transition: right 0.3s ease;
  z-index: 1000; /* Set a high z-index */
`;

const Menu = styled.div`
  padding: 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

const menuItems = [
  { to: "/mypage", text: "마이페이지" },
  { to: "/board", text: "자유게시판" },
  { to: "/", text: "마이웹툰" },
  { to: "/", text: "최근 쓴 글" },
  { to: "/", text: "웹툰 목록" },
];

const Sidebar = ({ isOpen, onMenuClick }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

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

  useEffect(() => {
    // 로그인 상태 변경될 때마다 확인
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (session !== null) {
        console.log("로그인되어 있습니다.");
      } else {
        console.log("로그아웃되어 있습니다.");
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]); // isLoggedIn이 변경될 때마다 실행

  const handleLogout = async () => {
    await logout();
  };

  const handleLoginClick = () => {
    // "로그인" 메뉴를 클릭하면 로그인 페이지로 이동하고 사이드바를 닫음
    navigate("/login");
    onMenuClick();
  };

  return (
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
          <Menu onClick={onMenuClick}>{item.text}</Menu>
        </Link>
      ))}

      {isLoggedIn ? (
        <Menu style={{ fontSize: "12px", textDecoration: "none" }} onClick={handleLogout}>
          로그아웃
        </Menu>
      ) : (
        <Menu onClick={handleLoginClick}>로그인</Menu>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
