import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../background/Header";
import { useMatch } from "react-router-dom";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 30px; // Footer와의 간격
  text-align: center;
  align-items: center;
  transition: box-shadow 0.3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    max-width: 100%; /* 모바일 화면에서 가로 길이를 100%로 설정 */
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #d8d8d8;
  border-radius: 10px;
  box-sizing: border-box;
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

function BoardLayout() {
  const showWriteBtn = useMatch("/board"); // 현재 경로가 '/board'인지 확인

  return (
    <>
      <Link to="/board" style={{ textDecoration: "none" }}>
        <Header title="자유게시판" />
      </Link>

      <BoardContainer>
        {showWriteBtn && <BoardBtn>쓰기</BoardBtn>}
        <ListContainer>
          <Outlet />
        </ListContainer>
      </BoardContainer>
    </>
  );
}

export default BoardLayout;
