import React from 'react';
import { FaSearch, FaBars } from 'react-icons/fa'; // React-icons에서 사용할 아이콘 가져오기
import './Navbar.css'; // 스타일을 정의하는 CSS 파일

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-icons">
        <FaSearch />
        <FaBars />
      </div>
    </div>
  );
}

export default Navbar;
