// Sidebar.js
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabase";

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-270px")};
  width: ${({ isOpen }) => (isOpen ? "270px" : "0")};
  height: 100%;
  background-color: rgba(30, 30, 30, 0.95);
  transition: right 0.3s ease;
`;

const Menu = styled.div`
  padding: 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

const menuItems = [
  { to: "/login", text: "로그인" },
  { to: "/join/step1", text: "회원가입" },
  { to: "/mypage", text: "마이페이지" },
  { to: "/freeboard", text: "자유게시판" },
  // { to: "/", text: "마이웹툰" },
  { to: "/", text: "최근 쓴 글" },
  // { to: "/", text: "웹툰 목록" },
];

const Sidebar = ({ isOpen, onMenuClick }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인된 상태인지 확인
    const checkLoggedIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session !== null) {
        // 이미 로그인된 상태라면 메인 페이지로 이동
        console.log("로그인되어 있습니다.");
        console.log(isLoggedIn);
        setLoggedIn(true);
      } else {
        console.log("로그아웃되어 있습니다.");
        console.log(isLoggedIn);
      }
    };

    checkLoggedIn();
  }, []);

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    } else {
      // 로그아웃 성공한 경우 로그아웃 메시지를 표시하거나 원하는 작업을 수행할 수 있습니다.
      alert("로그아웃되었습니다.");
      navigate("/");
    }
  };

  return (
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
          <Menu onClick={onMenuClick}>{item.text}</Menu>
        </Link>
      ))}
      <Menu style={{ fontSize: "12px" }} onClick={handleLogout}>
        로그아웃
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
