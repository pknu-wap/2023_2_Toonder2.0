import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { PostHeader, PostActions, PostBtn } from "./PostView";
import axios from "axios";
import supabase from "../supabase";

function PostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loggedUserName, setLoggedUserName] = useState();
  const [loggedUserEmail, setLoggedUserEmail] = useState();

  // 사용자 이메일, 이름 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session === null && localStorage.getItem('loggedUserEmail') === undefined) {
        alert("로그인을 먼저 해주세요.");
        navigate("/login");
      } else {
        var email ;
        if (session === null){
          email = localStorage.getItem('loggedUserEmail');
          setLoggedUserEmail(localStorage.getItem('loggedUserEmail'));  
        }
        else {
          email = data.session.user.email;
          setLoggedUserEmail(email);
          console.log(loggedUserEmail);
        }
        
    
        const rdata = {
          email: email,
        };

        axios
          .post("toonder/name", rdata)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, []);

  // 글 작성하기
  const handleSubmit = async () => {
    if (title.length >= 100) alert("제목은 100글자를 넘을 수 없습니다.");

    if (!title || !content) {
      alert("제목과 내용을 작성해주세요.");
      return;
    }

    const requestData = {
      brdTitle: title,
      brdContent: content, //addConvertLine(content),
      mem_name: loggedUserName,
      mem_email: loggedUserEmail,
    };

    try {
      await axios.post("/toonder/board", requestData);
      alert("글이 저장되었습니다.");
      navigate(-1);
    } catch (error) {
      console.log(error);
      console.log(requestData);
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

export const PostTitle = styled.input`
  font-family: "NIXGONM-Vb";
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  font-size: 20px;
  margin: 20px 0px 10px 0px;
  width: 100%;

  &:focus {
    outline: none;
  }

  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

export const PostContent = styled.textarea`
  font-family: "NIXGONM-Vb";
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  font-size: 14px;
  margin: 10px 0;
  width: 100%;
  line-height: 1.8;
  min-height: 200px; /* 사용자가 글을 쓸 수 있는 높이를 지정 */
  resize: none; /* 사용자가 글 작성 영역을 조절하지 못하도록 함 */

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.text};
  }
`;

export default PostForm;
