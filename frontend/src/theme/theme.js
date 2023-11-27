import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
  header: "#424242",
  body: "#fafafa", // 전체 브라우저의 색상을 green으로 지정
  footerBackground: "#bdbdbd",
  footerText: "#212121",
  text: "#212121",
  containerBorder: "#9e9e9e",
  postText: "#212121",
  postProperty: "#424242",
  commentForm: "#e0e0e0",
  commentWriteForm: "#bdbdbd",
  placeholderText: "#929292",
  paginationDefault: "#9e9e9e",
  paginationHover: "#bdbdbd",
};
export const darkTheme = {
  font: "NIXGONM-Vb", // 폰트 추가
  header: "#efefef",
  body: "#414141",
  text: "#efefef",
  footerBackground: "#121212",
  footerText: "#efefef",
  containerBorder: "#d8d8d8",
  postText: "#e2e2e2",
  postProperty: "#d8d8d8",
  commentForm: "#6e6e6e",
  commentWriteForm: "#808080",
  placeholderText: "#cccccc",
  paginationDefault: "grey",
  paginationHover: "black",
};
