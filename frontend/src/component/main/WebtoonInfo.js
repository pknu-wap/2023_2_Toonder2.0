import Header from "../background/Header";
import Navbar from "../background/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";

function WebtoonInfo() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./webtoondata.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Header title="웹툰 정보" />
      <BoardContainer>
        <InfoContainer>
          <ThumbnailWrapper
            src={process.env.PUBLIC_URL + "/webtoon_thumbnail.jpg"}
            alt="webtoon_thumbnail"
            width="160px"
            height="auto"
          />
          <InfoWrapper>
            <div style={{ fontSize: "24px" }}>{jsonData.title}</div>
            <div>
              글/그림작가 | {jsonData.pictrWritrNm}/{jsonData.sntncWritrNm}
            </div>
            <div>장르 | {jsonData.mainGenreCdNm}</div>
            <div>연재처 | {jsonData.pltfomCdNm}</div>
            <BoardBtn>즐겨찾기</BoardBtn>
          </InfoWrapper>
        </InfoContainer>

        {/* 줄거리 */}
        <div style={{ marginTop: "30px" }}>줄거리</div>
        <ContentWrapper>{jsonData.outline}</ContentWrapper>

        {/* 리뷰 */}
        <div style={{ marginTop: "30px" }}>리뷰</div>
        <ContentWrapper>
          {jsonData.review && jsonData.review.map((review) => (
            <ReviewWrapper key={review.revNo}>
              <ReviewContent>{review.revContent}</ReviewContent>
              <ReviewProperty>
                <div>{review.memName}</div>
                <div>{`별점: ${review.revRating}`}</div>
              </ReviewProperty>
            </ReviewWrapper>
          ))}
        </ContentWrapper>

        {/* 리뷰 작성 폼 */}
        <ReviewWriteFormContainer>
          <ReviewWriteForm placeholder="리뷰를 작성해보세요!"></ReviewWriteForm>
          <ReviewSubmitBtn>등록</ReviewSubmitBtn>
        </ReviewWriteFormContainer>
      </BoardContainer>
    </>
  );
}


const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 30px; // Footer와의 간격
  text-align: center;
  font-size: 20px;
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 왼쪽 정렬로 변경 */
`;

const ThumbnailWrapper = styled.img`
  margin-right: 20px;
  border-radius: 10px; /* 테두리를 둥글게 설정 */
  overflow: hidden; /* 테두리를 둥글게 만들기 위해 추가 */

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: 150px; /* 모바일에서 이미지 크기 줄임 */
  }
`;

const InfoWrapper = styled.div`
  flex-direction: column;
  font-size: 16px;
  text-align: left;

  > div {
    margin-bottom: 15px; /* 각 div 요소의 아래쪽 여백 설정 */
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  text-align: left;
  border: 1.5px solid #d8d8d8;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 0px; // Footer와의 간격
  width: 500px;
  margin-top: 10px;
  max-height: 160px;
  padding: 20px 15px 20px 15px; /* 내부 여백 */
  overflow-y: auto;

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: 96vw;
  }
`;

export const BoardBtn = styled.button`
  display: center;
  font-family: "NIXGONM-Vb";
  background-color: #6e6e6e;
  border: none;
  color: #e2e2e2;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 16px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ReviewWriteFormContainer = styled.form`
  position: relative;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px; /* 버튼과의 간격 조정 */
`;

const ReviewWriteForm = styled.textarea`
  font-family: "NIXGONM-Vb";
  display: flex;
  border: 1.5px solid #808080;
  font-size: 14px;
  color: #efefef;
  background: #808080;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 10px 0px 10px 0px;
  padding: 10px 10px 50px 10px; /* 내부 여백 */
  resize: none;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */

  &:focus {
    outline: none;
    color: #e2e2e2;
  }

  &::placeholder {
    color: #cccccc;
  }
`;

const ReviewSubmitBtn = styled.button`
  font-family: "NIXGONM-Vb";
  font-size: 14px;
  width: 100%;
  padding: 8px 16px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  color: #e2e2e2;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  
  text-align: left;
`;

const ReviewContent = styled.div`
  font-size: 16px;
  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
  &:hover {
    cursor: pointer;
  }
`;

const ReviewProperty = styled.div`
  display: flex;
  justify-content: space-between;
  color: #d8d8d8;
  font-size: 14px;
  margin: 10px 0px 10px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

export default WebtoonInfo;
