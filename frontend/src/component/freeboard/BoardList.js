import Header from "../background/Header";
import styled from "styled-components";

const FreeboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  transition: box-shadow 0.3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    max-width: 96%; /* 모바일 화면에서 가로 길이를 100%로 설정 */
  }
`;

const WriteBtn = styled.button`
  font-family: "NIXGONM-Vb";
  background-color: #6e6e6e;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px 24px;
  display: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }

  margin-left: auto;
`;

const ListContainer = styled.div`
  display: flex;
  border: 1.5px solid #efefef;
  border-radius: 10px;
  padding: 240px; /* 내부 여백을 줄임 */
  margin-top: 16px;
  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    padding: 170px; /* 모바일에서 내부 여백을 더 줄임 */
  }
`;

function BoardList() {
  return (
    <>
      <Header title="자유게시판" />
      <FreeboardContainer>
        <WriteBtn>쓰기</WriteBtn>
        <ListContainer>
          {/* 글 목록 컨텐츠를 여기에 추가 */}
          {/* 예: <div>글 1</div> <div>글 2</div> */}
        </ListContainer>
      </FreeboardContainer>
    </>
  );
}

export default BoardList;
