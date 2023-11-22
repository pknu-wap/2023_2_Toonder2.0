import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { PostHeader, PostActions, PostBtn } from "./PostView";
import axios from "axios";

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 문자열 내의 모든 개행 문자를 @로 대체
  // const addConvertLine = (text) => {
  //   return text.replace(/\n/g, "@d`}");
  // };

  const handleSubmit = async () => {
    if (title.length >= 100)
      alert("제목은 100글자를 넘을 수 없습니다.");
    
    if (!title || !content) {
      alert("제목과 내용을 작성해주세요.");
      return;
    }

    const requestData = {
      brdTitle: title,
      brdContent: content, //addConvertLine(content),
      // mem_name: loggedUserName,
      // mem_email: email,
    };

    try {
      await axios.post("/toonder/board", requestData);
      alert("글이 저장되었습니다.");
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("글을 저장하지 못했습니다.");
    }
  };

  return (
    <>
      <PostHeader>
        <PostTitle
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
      </PostHeader>
      <PostContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <PostActions>
        <PostBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </PostBtn>
        <PostBtn type="submit" onClick={handleSubmit}>
          저장
        </PostBtn>
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
