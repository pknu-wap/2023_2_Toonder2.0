import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import supabase from "../supabase";
import { PostHeader, PostActions, PostBtn } from "./PostView";
import { PostTitle, PostContent } from "./PostForm";

function EditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const brdNo = location.state?.brdNo;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loggedUserName, setLoggedUserName] = useState();
  const [loggedUserEmail, setLoggedUserEmail] = useState();

  useEffect(() => {
    // useLocation을 통해 전달된 state에서 title과 content를 가져와 제목, 내용에 원래의 게시글 데이터를 채워넣음
    if (state) {
      setTitle(state.title || "");
      setContent(state.content || "");
    }
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      
      if (session === null && localStorage.getItem('loggedUserEmail') === undefined) {
        alert("로그인을 먼저 해주세요.");
        navigate("/login");
      } else {
        var email;

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

  // 문자열 내의 모든 개행 문자를 @로 대체
  // const addConvertLine = (text) => {
  //   return text.replace(/\n/g, "@d`}");
  // };

  const handleSubmit = async () => {
    if (title.length >= 100) alert("제목은 100글자를 넘을 수 없습니다.");

    if (!title || !content) {
      alert("제목과 내용을 작성해주세요.");
      return;
    }

    try {
      await axios.put(`/toonder/board/${brdNo}`, {
        brdTitle: title,
        brdContent: content,
        mem_name: loggedUserName,
        mem_email: loggedUserEmail,
      });
      alert('게시글이 수정되었습니다.');
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert('게시글 수정이 실패했습니다.');
      navigate(-1);
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

export default EditForm;
