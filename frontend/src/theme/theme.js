import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "NIXGONM-Vb";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "NIXGONM-Vb";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  html {
    background: ${({ theme }) => theme.body};
  }

  body {
    font-family: "NIXGONM-Vb"; /* 폰트 적용 */
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

export const lightTheme = {
  font: "NIXGONM-Vb", // 폰트 추가
  header: "#212121",
  body: "#fafafa", // 전체 브라우저의 색상을 green으로 지정
  footerBackground: "#bdbdbd",
  footerText: "#212121",
  text: "#212121",
  icon: "#212121", // Navbar 아이콘
  btnBackground: "#212121",
  btnBackgroundDisabled: "#616161", // 회원가입 페이지 입력 폼 유효성 미통과시
  containerBorder: "#9e9e9e", // 테두리
  postText: "#212121", // 글 제목
  postProperty: "#424242", // 글 속성 (작성일자, 조회수, 작성자 등)
  commentForm: "#e0e0e0", // 댓글란
  commentWriteForm: "#bdbdbd", // 댓글 작성 폼
  placeholder: "#929292", // 댓글 작성 폼 placeholer
  paginationDefault: "#9e9e9e",
  paginationHover: "#bdbdbd",
  inputFormBackground: "#fafafa", // 로그인 & 회원가입 input
  inputFormPlaceholder: "#757575", // 로그인 & 회원가입 input placeholder
};
export const darkTheme = {
  font: "NIXGONM-Vb", // 폰트 추가
  header: "#efefef",
  body: "#414141",
  text: "#efefef",
  icon: "white",
  btnBackground: "#6e6e6e",
  btnBackgroundDisabled: "#6e6e6e66",
  footerBackground: "#121212",
  footerText: "#efefef",
  containerBorder: "#d8d8d8",
  postText: "#e2e2e2",
  postProperty: "#d8d8d8",
  commentForm: "#6e6e6e",
  commentWriteForm: "#808080",
  placeholder: "#cccccc",
  paginationDefault: "grey",
  paginationHover: "black",
  inputFormBackground: "#414141",
  inputFormPlaceholder: "#bfbfbf;",
};
