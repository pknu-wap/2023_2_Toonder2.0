import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { PostHeader, PostActions, PostProperty, PostBtn } from "./PostView";

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 사용자가 입력한 제목을 상태로 관리
  const [content, setContent] = useState(""); // 사용자가 입력한 글 내용을 상태로 관리

  return (
    <>
      <PostHeader>
        <PostTitle
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="글 제목"
        />
      </PostHeader>
      <PostContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="글 내용을 입력하세요"
      />
      <PostActions>
        <PostBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </PostBtn>
        <PostBtn>저장</PostBtn>
      </PostActions>
    </>
  );
}

const PostTitle = styled.input`
  font-family: "NIXGONM-Vb";
  color: #e2e2e2;
  background: none;
  border: none;
  font-size: 20px;
  margin: 20px 0px 10px 0px;
  width: 100%;

  &:focus {
    outline: none;
    color: #e2e2e2;
  }

  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

const PostContent = styled.textarea`
  font-family: "NIXGONM-Vb";
  color: #e2e2e2;
  background: none;
  border: none;
  font-size: 16px;
  margin: 10px 0;
  width: 100%;
  line-height: 1.5;
  min-height: 200px; /* 사용자가 글을 쓸 수 있는 높이를 지정 */
  resize: none; /* 사용자가 글 작성 영역을 조절하지 못하도록 함 */

  &:focus {
    outline: none;
    color: #e2e2e2;
  }
`;

export default PostForm;
