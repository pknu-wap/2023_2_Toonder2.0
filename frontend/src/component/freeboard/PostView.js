import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BoardBtn } from "./BoardLayout";

function PostView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [post, setPost] = useState(null); // 글
  const [comments, setComments] = useState([]); // 댓글

  // 글 불러오기
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

  // 댓글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./commentdata.json");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 불러온 댓글
  const filteredComments = comments.filter(
    (comment) => comment.brdNo === post?.brdNo
  );

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
      <PostContentContainer>
        {post && (
          <>
            <PostContentWrapper>{post.brdContent}</PostContentWrapper>
            <PostBtnWrapper>
              <PostBtn>♥</PostBtn>
            </PostBtnWrapper>
          </>
        )}
      </PostContentContainer>
      <div style={{ color: "#e2e2e2", textAlign: "left", fontSize: "18px" }}>
        댓글
      </div>
      <CommentContainer>
        <CommentWrapper>
          {filteredComments.map((comment) => (
            <>
              <div style={{ fontSize: "14px" }} key={comment.cmtNo}>
                {`${comment.memName} : ${comment.cmtContent}`}
              </div>

              <CommentActions>
                <CommentBtn>수정</CommentBtn>
                <CommentBtn>삭제</CommentBtn>
              </CommentActions>
            </>
          ))}
        </CommentWrapper>
        <CommentWriteContainer></CommentWriteContainer>
      </CommentContainer>
    </>
  );
}

const PostHeader = styled.div`
  color: #e2e2e2;
  border-bottom: 1px solid grey;
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

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-size: 14px;
  color: #e2e2e2;
  margin: 20px 0px 20px 0px;
  white-space: pre-line; /* 글 내용 줄바꿈 적용 */
  line-height: 1.8; /* 줄간격 조정을 위한 line-height 속성 */
  text-align: left; /* 왼쪽 정렬을 위한 text-align 속성 */
  border-bottom: 1px solid grey;
`;

const PostContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PostBtnWrapper = styled.div`
  margin: 20px 0px 10px 0px;
  margin-left: auto;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #6e6e6e;
  background: #6e6e6e;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px 8px 10px 8px; /* 내부 여백 */
  /* 모바일 화면에 맞게 너비 조정 */
  width: calc(100%); /* 좌우 패딩값을 고려하여 너비 조정 */

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: calc(100%); /* 모바일에서도 동일한 너비 적용 */
  }
`;

const CommentWrapper = styled(PostProperty)`
  margin-botton: 10px;
  flex-wrap: wrap;
`;

const CommentActions = styled(PostActions)``;

const CommentBtn = styled.button`
  font-family: "NIXGONM-Vb";
  background: none;
  border: none;
  color: #e2e2e2;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 8px;
  display: center;
  margin-left: auto;
  background: none;
  font-size: 12px;
  padding: 6px 6px;
`;

const CommentWriteContainer = styled.div``;

export default PostView;
