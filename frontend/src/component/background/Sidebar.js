// Sidebar.js
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../supabase";
// import { useAuth } from "../../AuthContext";
import { useState } from "react";
import axios from "axios";

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-270px")};
  width: ${({ isOpen }) => (isOpen ? "270px" : "0")};
  height: 100%;
  background-color: rgba(30, 30, 30, 0.95);
  transition: right 0.3s ease;
  z-index: 1000;
`;

const Menu = styled.div`
  padding: 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
`;

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

const menuItems = [
  { to: "/mypage", text: "마이페이지" },
  { to: "/board", text: "자유게시판" },
  { to: "/", text: "마이웹툰" },
  { to: "/", text: "최근 쓴 글" },
  { to: "/", text: "웹툰 목록" },
];

const Sidebar = ({ isOpen, onMenuClick, isDarkTheme, setIsDarkTheme }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 확인
  const sidebarRef = useRef(null);
  const [theme, setTheme] = useState("Light Mode");
  const [adultFilter, setAdultFilter] = useState(false); // 19금 필터를 위한 상태
  const [loggedUserName, setLoggedUserName] = useState();

  // 사용자 이름 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session) {
        const email = session.user.email;

        const rdata = {
          email: email,
        };

        axios
          .post("toonder/name", rdata)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, []);

  // 다크모드 토글
  const handleDarkModeToggle = () => {
    const newTheme = isDarkTheme ? "Light Mode" : "Dark Mode";
    setIsDarkTheme(!isDarkTheme); // 테마 전환

    // 로컬 스토리지에 변경한 테마 저장
    localStorage.setItem("theme", newTheme);
  };

  const handleAdultFilterToggle = () => {
    setAdultFilter(!adultFilter); // 19금 필터 상태 변경
    // 여기에 19금 필터를 적용하거나 설정을 처리하는 로직을 추가할 수 있어요.
  };

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
    // 사용자의 인증 상태 확인
    const checkLoggedIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session) {
        setIsLoggedIn(true); // 로그인 상태인 경우 true로 설정
      } else {
        setIsLoggedIn(false); // 로그아웃 상태인 경우 false로 설정
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogoutClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    } else {
      navigate("/"); // 로그아웃 성공시 메인으로 리다이렉트
      alert("로그아웃되었습니다.");
      window.location.replace("/");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
    onMenuClick(); // 사이드바 닫기
  };

  return (
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      <Menu style={{ cursor: "auto", lineHeight: "1.5" }}>
        {isLoggedIn ? (
          <div>
            {loggedUserName}님<br />
            안녕하세요!
          </div>
        ) : (
          <></>
        )}
      </Menu>

      {menuItems.map((item, index) => (
        <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
          <Menu onClick={onMenuClick}>{item.text}</Menu>
        </Link>
      ))}

      {/* 다크 모드 토글 스위치 */}
      <Menu>
        <ToggleSwitch>
          <span>{theme}</span>
          <Input
            type="checkbox"
            checked={!isDarkTheme}
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

      <Menu onClick={handleLoginClick}>
        {isLoggedIn ? (
          <Menu onClick={handleLogoutClick}>로그아웃</Menu>
        ) : (
          <Menu onClick={handleLoginClick}>로그인</Menu>
        )}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
