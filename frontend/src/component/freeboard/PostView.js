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
      {/* 본문 */}
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

      {/* 댓글 */}
      <div style={{ color: "#e2e2e2", textAlign: "left", fontSize: "18px" }}>
        댓글
      </div>
      <CommentContainer>
        {filteredComments.map((comment) => (
          <>
            <CommentInnerContainer>
              <div key={comment.cmtNo}>
                <CommentContentWrapper style={{ fontSize: "14px" }}>
                  <div>{`${comment.memName} : ${comment.cmtContent}`}</div>
                </CommentContentWrapper>
                <CommentPropertyWrapper>
                  <span>{`${comment.cmtUpdateDate}`}</span>
                  <CommentBtn>♥</CommentBtn>
                  <span>{`${comment.cmtLike}`}</span>
                  <CommentBtn>수정</CommentBtn>
                  <CommentBtn>삭제</CommentBtn>
                </CommentPropertyWrapper>
              </div>
            </CommentInnerContainer>
          </>
        ))}
        <CommentWriteFormContainer>
          <CommentWriteForm placeholder="댓글을 입력하세요"></CommentWriteForm>
          <CommentSubmitBtn>등록</CommentSubmitBtn>
        </CommentWriteFormContainer>
      </CommentContainer>
    </>
  );
}

export const PostHeader = styled.div`
  color: #e2e2e2;
  border-bottom: 1px solid grey;
  width: 100%;
  text-align: left;
`;

export const PostTitle = styled.div`
  font-size: 20px;
  margin: 20px 0px 0px 0px;
  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

export const PostProperty = styled.div`
  display: flex;
  flex-direction: row; /* 모바일 뷰에서 컬럼 방향으로 변경 */
  justify-content: space-between; /* 내부 아이템 간격 벌리기 */
  align-items: center; /* 세로 중앙 정렬 */
  color: #d8d8d8;
  font-size: 12px;
  margin: 10px 0px 10px 0;

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PostActions = styled.div`
  display: flex; /* Flexbox를 사용하여 내부 아이템 정렬 */
  justify-content: flex-end;
  align-items: center; /* 세로 중앙 정렬 */

  @media (max-width: 540px) {
    margin-top: 10px;
    margin-left: auto;
  }
`;

export const PostBtn = styled(BoardBtn)`
  font-size: 12px;
  padding: 6px 16px;
  margin-left: 8px; /* 버튼 사이의 간격 조정 */
`;

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
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
  padding: 0px 15px 10px 15px; /* 내부 여백 */
  /* 모바일 화면에 맞게 너비 조정 */
  width: calc(100%); /* 좌우 패딩값을 고려하여 너비 조정 */

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: calc(100%); /* 모바일에서도 동일한 너비 적용 */
  }
`;

const CommentInnerContainer = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid grey;
`;

const CommentContentWrapper = styled(PostProperty)`
  margin-bottom: 0px;
`;

const CommentPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #e2e2e2;
  margin: 10px 0px 15px 0px;
`;

const CommentBtn = styled.button`
  font-family: "NIXGONM-Vb";
  float: left;
  background: none;
  border: none;
  color: #e2e2e2;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  background: none;
  font-size: 12px;
`;

const CommentWriteFormContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px; /* 버튼과의 간격 조정 */
`;

const CommentWriteForm = styled.textarea`
  font-family: "NIXGONM-Vb";
  display: flex;
  border: 1.5px solid #808080;
  font-size: 14px;
  color: #efefef;
  background: #808080;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 20px 0px 10px 0px;
  padding: 10px 10px 50px 10px; /* 내부 여백 */
  resize: none;

  &:focus {
    outline: none;
    color: #e2e2e2;
  }

  &::placeholder {
    color: #cccccc;
  }
`;

const CommentSubmitBtn = styled.button`
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

export default PostView;
