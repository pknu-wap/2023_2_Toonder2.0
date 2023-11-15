import React, { useState, useEffect } from "react";
import Header from "../background/Header";
import styled from "styled-components";

const FreeboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 100px;
  text-align: center;
  align-items: center;
  transition: box-shadow 0.3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  /* 미디어 쿼리 추가 */
  @media (max-width: 180px) {
    max-width: 100%; /* 모바일 화면에서 가로 길이를 100%로 설정 */
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
  padding: 8px 20px;
  display: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }

  margin-left: auto;
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

const PostItem = styled.div`
  color: #e2e2e2;
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-align: left;
`;

const PostTitle = styled.div`
  font-size: 16px;
  margin: 20px 0px 0px 0px;
  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

const PostProperty = styled.div`
  color: #d8d8d8;
  font-size: 12px;
  margin: 10px 0px 20px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

function BoardList() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./postdata.json");
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
      <Header title="자유게시판" />
      <FreeboardContainer>
        <WriteBtn>쓰기</WriteBtn>
        <ListContainer>
          {jsonData.map((post, index) => (
            <PostItem key={index}>
              <PostTitle>{post.brdTitle}</PostTitle>
              <PostProperty>
                {`${post.brdUpdateDate} · 조회 ${post.brdViewCount} · 좋아요 ${post.brdLike} · 작성자 ${post.member}`}
              </PostProperty>
            </PostItem>
          ))}
        </ListContainer>
      </FreeboardContainer>
    </>
  );
}

export default BoardList;