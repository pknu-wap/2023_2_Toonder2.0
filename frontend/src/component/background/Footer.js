import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lightTheme, darkTheme } from "../../theme/theme";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0; /* 브라우저 가장 하단에 위치시킴 */
  width: 100%; /* 모바일 화면에 맞게 설정 */
  max-width: 540px; /* 컴퓨터 브라우저에서 Container의 너비에 딱 맞도록 설정 */
  background: ${({ theme }) => theme.footerBackground};
  display: flex;
  justify-content: space-evenly; /* 아이콘들을 동일한 간격으로 정렬합니다. */
  align-items: center;
  border-top-left-radius: 10px; /* 왼쪽 위 모서리를 둥글게 만듭니다. */
  border-top-right-radius: 10px; /* 오른쪽 위 모서리를 둥글게 만듭니다. */
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  width: 60px;
  flex: 1; /* 각 요소가 동일한 너비를 가지도록 설정 */
`;

const FooterIconText = styled.div`
  font-size: 10px;
  align-items: center;
  color: ${({ theme }) => theme.footerText};
  padding-top: 6px;
  letter-spacing: 1px;
`;

export const Footer = ({ isDarkTheme }) => {
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const getImagePath = (imageName) => {
    return isDarkTheme
      ? `/dark_theme/${imageName}.png`
      : `/light_theme/${imageName}.png`;
  };

  return (
      <FooterContainer>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          {/* textDecoration: "none" : 텍스트 클릭 시 밑줄 안 보이게*/}
          <FooterItem>
            <img
              src={process.env.PUBLIC_URL + getImagePath("home_icon")}
              alt="logo"
              width="28px"
              height="auto"
            />
            <FooterIconText>홈</FooterIconText>
          </FooterItem>
        </Link>

        <Link to="/webtoonlist" style={{ textDecoration: "none" }}>
          <FooterItem>
            <img
              src={process.env.PUBLIC_URL + getImagePath("webtoonlist_icon")}
              alt="logo"
              width="26px"
              height="auto"
            />
            <FooterIconText>웹툰목록</FooterIconText>
          </FooterItem>
        </Link>

        <Link to="/mywebtoon" style={{ textDecoration: "none" }}>
          <FooterItem>
            <img
              src={process.env.PUBLIC_URL + getImagePath("mywebtoon_icon")}
              alt="logo"
              width="26px"
              height="auto"
            />
            <FooterIconText>마이웹툰</FooterIconText>
          </FooterItem>
        </Link>

        <Link to="/mypage" style={{ textDecoration: "none" }}>
          <FooterItem>
            <img
              src={process.env.PUBLIC_URL + getImagePath("mypage_icon")}
              alt="logo"
              width="26px"
              height="auto"
            />
            <FooterIconText>마이페이지</FooterIconText>
          </FooterItem>
        </Link>
      </FooterContainer>
  );
};
