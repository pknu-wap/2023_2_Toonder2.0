// Sidebar.js
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabase";
import { useAuth } from "../../AuthContext";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> main

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-270px")};
  width: ${({ isOpen }) => (isOpen ? "270px" : "0")};
  height: 100%;
  background-color: rgba(30, 30, 30, 0.95);
  transition: right 0.3s ease;
<<<<<<< HEAD
  z-index: 1000; /* Set a high z-index */
=======
  z-index: 1000;
>>>>>>> main
`;

const Menu = styled.div`
  padding: 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

<<<<<<< HEAD
=======
const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit; /* Menu 컴포넌트의 폰트 크기를 상속 */
`;

const Slider = styled.span`
  position: relative;
  display: inline-block;
  width: 34px; /* 토글 스위치 크기 */
  height: 20px; /* 토글 스위치 크기 */
  background-color: #ccc;
  border-radius: 20px; /* 토글 스위치의 반원 형태 */
  transition: 0.4s;
  margin-left: 5px; /* 토글 스위치와 레이블 사이 간격 */

  &:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #2196f3;
  }

  &:checked + ${Slider}:before {
    transform: translateX(14px); /* 토글 스위치의 크기에 맞게 조정 */
  }
`;

>>>>>>> main
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
<<<<<<< HEAD

  const sidebarRef = useRef(null);
=======
  const sidebarRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false); // 다크 모드를 위한 상태
  const [adultFilter, setAdultFilter] = useState(false); // 19금 필터를 위한 상태

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode); // 다크 모드 상태 변경
    // 여기에 다크 모드 스타일을 적용하거나 설정을 처리하는 로직을 추가할 수 있어요.
  };

  const handleAdultFilterToggle = () => {
    setAdultFilter(!adultFilter); // 19금 필터 상태 변경
    // 여기에 19금 필터를 적용하거나 설정을 처리하는 로직을 추가할 수 있어요.
  };
>>>>>>> main

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

<<<<<<< HEAD
  const handleLogout = async () => {
=======
  const handleLogoutClick = async () => {
>>>>>>> main
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

<<<<<<< HEAD
      {isLoggedIn ? (
        <Menu style={{ fontSize: "12px", textDecoration: "none" }} onClick={handleLogout}>
=======
      {/* 다크 모드 토글 스위치 */}
      <Menu>
        <ToggleSwitch>
          <span>Dark Mode</span>
          <Input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
          <Slider />
        </ToggleSwitch>
      </Menu>

      {/* 19금 필터 토글 스위치 */}
      <Menu>
        <ToggleSwitch>
          <span>19+</span>
          <Input
            type="checkbox"
            checked={adultFilter}
            onChange={handleAdultFilterToggle}
          />
          <Slider />
        </ToggleSwitch>
      </Menu>

      {/* 로그인 상태면 로그아웃 버튼, 로그아웃 상태면 로그인 버튼 보이도록 함 */}
      {isLoggedIn ? (
        <Menu
          style={{ fontSize: "12px", textDecoration: "none" }}
          onClick={handleLogoutClick}
        >
>>>>>>> main
          로그아웃
        </Menu>
      ) : (
        <Menu onClick={handleLoginClick}>로그인</Menu>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
