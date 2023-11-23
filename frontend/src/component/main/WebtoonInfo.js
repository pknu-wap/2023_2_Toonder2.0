import Header from "../background/Header";
import Navbar from "../background/Navbar";
import styled from "styled-components";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 30px; // Footer와의 간격
  text-align: center;
  align-items: flex-start; /* 왼쪽 정렬로 변경 */
  color: white; /* 글자 색을 흰색으로 설정 */
  transition: box-shadow 0.3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    max-width: 100%; /* 모바일 화면에서 가로 길이를 100%로 설정 */
  }
`;

const InfoContainer = styled.div``;

const ThumbnailWrapper = styled.div``;

const InfoWrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #d8d8d8;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 0px; // Footer와의 간격
  width: 500px;
  margin-top: 10px;
  padding: 10px 20px 10px 20px; /* 내부 여백 */
  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: 96vw;
  }
`;

export const BoardBtn = styled.button`
  font-family: "NIXGONM-Vb";
  background-color: #6e6e6e;
  border: none;
  color: #e2e2e2;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 24px;
  display: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }

  margin-left: auto;
`;

function WebtoonInfo() {
  return (
    <>
      <Navbar />
      <Header title="웹툰 정보" />
      <BoardContainer>
        <InfoContainer>
          <ThumbnailWrapper></ThumbnailWrapper>
          <InfoWrapper></InfoWrapper>
        </InfoContainer>

        {/* 줄거리 */}
        <div>줄거리</div>
        <ContentWrapper></ContentWrapper>

        {/* 리뷰 */}
        <div style={{ marginTop: "20px" }}>리뷰</div>
        <ContentWrapper></ContentWrapper>

        {/* 리뷰 작성 폼 */}
      </BoardContainer>
    </>
  );
}

export default WebtoonInfo;
