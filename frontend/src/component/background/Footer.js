import React from "react";
import styled from "styled-components";
import { FaHome, FaUser, FaPlus, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  // left: 50%; /* 가운데 정렬을 위해 왼쪽으로 이동 */
  // transform: translateX(-50%); /* 가운데 정렬을 위해 왼쪽으로 이동 */
  width: 100%; /* 모바일 화면에 맞게 설정 */
  max-width: 540px; /* 컴퓨터 브라우저에서 Container의 너비에 딱 맞도록 설정 */
  background: #121212;
  display: flex;
  justify-content: space-around; /* 아이콘들을 동일한 간격으로 정렬합니다. */
  align-items: center;
  // border-top: 1px solid #efefef; /* 경계선 스타일 추가 */
  border-top-left-radius: 10px; /* 왼쪽 위 모서리를 둥글게 만듭니다. */
  border-top-right-radius: 10px; /* 오른쪽 위 모서리를 둥글게 만듭니다. */
`;

const FooterIcons = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
  padding: 14px;
`;

const WhiteIcon = styled.div`
  color: white;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterIcons>
        <Link to="/">
          <FaHome />
        </Link>
      </FooterIcons>
      <FooterIcons>
        <FaUser />
      </FooterIcons>
      <FooterIcons>
        <FaPlus />
      </FooterIcons>
      <FooterIcons>
        <FaSignInAlt />
      </FooterIcons>
    </FooterContainer>
  );
};
