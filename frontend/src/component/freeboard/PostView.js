import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BoardBtn } from "./BoardLayout";

const PostHeader = styled.div`
  color: #e2e2e2;
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-align: left;
`;

const PostTitle = styled.div`
  font-size: 20px;
  margin: 20px 0px 0px 0px;
  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

const PostProperty = styled.div`
  display: flex; /* Flexbox를 사용하여 내부 아이템 정렬 */
  justify-content: space-between; /* 내부 아이템 간격 벌리기 */
  align-items: center; /* 세로 중앙 정렬 */
  color: #d8d8d8;
  font-size: 12px;
  margin: 10px 0px 20px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

const PostActions = styled.div`
  display: flex; /* Flexbox를 사용하여 내부 아이템 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const PostBtn = styled(BoardBtn)`
  font-size: 12px;
  padding: 6px 16px;
  margin-left: 8px; /* 버튼 사이의 간격 조정 */
  }
`;

const PostContent = styled.div`
  font-size: 14px;
  color: #e2e2e2;
  margin: 20px 0px 20px 0px;
  white-space: pre-line; /* 글 내용 줄바꿈 적용 */
  line-height: 1.8; /* 줄간격 조정을 위한 line-height 속성 */
  text-align: left; /* 왼쪽 정렬을 위한 text-align 속성 */
  border-bottom: 1px solid #ccc;
`;

function PostView() {
  const [jsonData, setJsonData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./postdata.json");
        const data = await response.json();
        const foundPost = data.find((post) => post.brdNo === state?.brdNo);
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state]);

  return (
    <>
      <PostHeader>
        {post ? (
          <>
            <PostTitle>{post.brdTitle}</PostTitle>
            <PostProperty>
              <div>
                {`${post.brdUpdateDate} · 조회 ${post.brdViewCount} · 좋아요 ${post.brdLike} · 작성자 ${post.member}`}
              </div>
              <PostActions>
                <PostBtn>수정</PostBtn>
                <PostBtn>삭제</PostBtn>
              </PostActions>
            </PostProperty>
          </>
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </PostHeader>
      <PostContent>
        {post && post.brdContent}
        <PostBtn>❤</PostBtn>
      </PostContent>
    </>
  );
}

export default PostView;
