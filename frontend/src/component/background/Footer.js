import React from "react";
import styled from "styled-components";
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

const FooterIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  padding-top: 8px;
  color: #efefef;
`;

const FooterIconText = styled.div`
  font-size: 10px;
  align-items: center;
  color: #efefef;
  padding: 6px;
  letter-spacing: 1px;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Link to="/" style={{ textDecoration: "none" }}>
        <FooterIcon>
          <img
            src={process.env.PUBLIC_URL + "/home_icon_dark.png"}
            alt="logo"
            width="28px"
            height="auto"
          />
        </FooterIcon>
        <FooterIconText>홈</FooterIconText>
      </Link>

      <Link to="/webtoonlist" style={{ textDecoration: "none" }}>
        <FooterIcon>
          <img
            src={process.env.PUBLIC_URL + "/webtoonlist_icon_dark.png"}
            alt="logo"
            width="26px"
            height="auto"
          />
        </FooterIcon>
        <FooterIconText>웹툰목록</FooterIconText>
      </Link>

      <Link to="/mywebtoon" style={{ textDecoration: "none" }}>
        <FooterIcon>
          <img
            src={process.env.PUBLIC_URL + "/mywebtoon_icon_dark.png"}
            alt="logo"
            width="26px"
            height="auto"
          />
        </FooterIcon>
        <FooterIconText>마이웹툰</FooterIconText>
      </Link>

      <Link to="/mypage" style={{ textDecoration: "none" }}>
        <FooterIcon>
          <img
            src={process.env.PUBLIC_URL + "/mypage_icon_dark.png"}
            alt="logo"
            width="26px"
            height="auto"
          />
        </FooterIcon>
        <FooterIconText>마이페이지</FooterIconText>
      </Link>
    </FooterContainer>
  );
};
