import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BoardBtn } from "./BoardLayout";
import supabase from "../supabase";
import axios from "axios";

function PostView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const brdNo = location.state?.brdNo;
  const [post, setPost] = useState(null); // 글
  const [comments, setComments] = useState([]); // 댓글
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentNo, setEditingCommentNo] = useState("");
  const [email, setEmail] = useState();
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [submitCmtEditBtnText, setSubmitCmtEditBtnText] = useState("수정");

  // 이메일 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session === null) {
        alert("로그인을 먼저 해주세요.");
        navigate("/login");
      } else {
        const email = session.user.email;
        setEmail(email);
      }
    };
    fetchData();
  }, []);

  // 게시글 불러오기
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

  // 게시글 수정
  const handleEditPost = () => {
    if (post.mem_email !== email) {
      alert("본인의 게시글만 수정이 가능합니다.");
      return;
    } else {
      navigate(`/edit/${brdNo}`, {
        state: {
          brdNo: post.brdNo,
          title: post.brdTitle,
          content: post.brdContent,
        },
      });
    }
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/toonder/board/${brdNo}`, {
        data: { mem_email: email },
      });
      alert("삭제가 성공했습니다.");
      navigate("/freeboard");
    } catch (error) {
      console.log(error);
      alert("본인의 게시글만 삭제가 가능합니다.");
    }
  };

  // 게시글 좋아요
  const handleLike = async () => {
    try {
      const headers = {
        mem_email: email,
      };
      await axios.post(`/toonder/board/${brdNo}/like`, null, {
        headers,
      });
      alert("좋아요가 반영되었습니다.");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("좋아요가 실패 했습니다.");
    }
  };

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

  // 댓글 등록
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("댓글을 입력하세요.");
      return;
    }
    const name = localStorage.getItem("loggedUserName");
    try {
      await axios.post(`/toonder/board/${brdNo}/comment`, {
        cmtContent: comment,
        mem_name: name,
        mem_email: email,
      });
      alert("댓글이 작성되었습니다.");
      setComment("");

      const response = await axios.get(`/toonder/board/${brdNo}/comment`);
      setComment(response.data);
    } catch (error) {
      console.log(error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  // 댓글 수정
  const handleEditComment = (cmtNo, cmtEmail) => {
    if (cmtEmail !== email) {
      alert("본인의 댓글만 수정이 가능합니다.");
      return;
    } else {
      // 해당 댓글의 내용과 번호를 가져와서 상태에 설정합니다.
      const targetComment = comments.find((comment) => comment.cmtNo === cmtNo);
      // 수정할 댓글 내용을 textarea에 표시하기 위해 setEditedComment를 이용해 설정합니다.
      setEditedComment(targetComment.cmtContent); // 수정 가능하도록 textarea에 댓글 내용 설정
      setEditingCommentNo(cmtNo); // 수정 중인 댓글 번호 설정
    }
  };

  // 댓글 수정 내용
  const handleEditChange = (editedText, cmtNo) => {
    // 수정 중인 댓글의 내용을 변경합니다.
    setEditedComment(editedText);
    // 현재 수정 중인 댓글 번호를 상태에 설정합니다.
    setEditingCommentNo(cmtNo);
  };

  // 댓글 수정 등록
  const handleSubmitEditedComment = async (e, cmtNo) => {
    e.preventDefault();

    if (!editedComment) {
      alert("댓글을 입력하세요.");
      return;
    }

    try {
      await axios.put(`/toonder/board/${brdNo}/comment/${cmtNo}`, {
        cmtContent: editedComment,
        mem_email: email,
      });
      alert("댓글이 성공적으로 수정되었습니다.");
      // 수정이 완료되면 상태를 초기화
      setEditedComment("");
      setEditingCommentNo("");
      // 서버에서 댓글을 다시 가져옴
      const response = await axios.get(`/toonder/board/${brdNo}/comment`);
      setComments(response.data);
    } catch (error) {
      console.log(editedComment);
      console.error("댓글 수정에 실패했습니다:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  // 댓글 수정 취소
  const handleCancelEditComment = (cmtNo) => {
    setEditedComment("");
    setEditingCommentNo("");
  };

  // 댓글 삭제
  const handleDeleteComment = async (cmtContent, cmtBno, cmtEmail) => {
    if (cmtEmail !== email) {
      alert("본인의 댓글만 삭제가 가능합니다.");
      return;
    }

    try {
      await axios.delete(`/toonder/board/${brdNo}/comment/${cmtBno}`, {
        data: { cmtContent: cmtContent, mem_email: email },
      });
      alert("댓글이 삭제되었습니다.");
      setIsCommentDeleted(true);
    } catch (error) {
      console.log(error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 댓글 좋아요
  const handleLikeComment = async (cmtNo) => {
    try {
      const headers = {
        mem_email: email,
      };
      await axios.post(`/toonder/board/${brdNo}/comment/${cmtNo}/like`, null, {
        headers,
      });
      alert("댓글 좋아요가 반영되었습니다.");
    } catch (error) {
      console.log(error);
      alert("좋아요가 실패 했습니다.");
    }
  };

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
                <PostBtn onClick={handleEditPost}>수정</PostBtn>
                <PostBtn onClick={handleDeletePost}>삭제</PostBtn>
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
              <PostBtn onClick={handleLike}>♡</PostBtn>
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
          <CommentInnerContainer key={comment.cmtNo}>
            <>
              {editingCommentNo === comment.cmtNo ? (
                <CommentContentWrapper style={{ fontSize: "14px" }}>
                  <div
                    style={{ fontFamily: "NIXGONB-Vb-B" }}
                  >{`${comment.memName}`}</div>
                  <CommentWriteForm
                    style={{marginTop:"0px"}}
                    value={
                      editingCommentNo === comment.cmtNo
                        ? editedComment
                        : comment.cmtContent
                    }
                    onChange={(e) =>
                      handleEditChange(e.target.value, comment.cmtNo)
                    }
                    placeholder="댓글을 입력하세요"
                  ></CommentWriteForm>
                  <CommentPropertyWrapper>
                    <CommentBtn
                      onClick={(e) =>
                        handleSubmitEditedComment(e, comment.cmtNo)
                      }
                    >
                      수정 완료
                    </CommentBtn>
                    <CommentBtn
                      onClick={() => handleCancelEditComment(comment.cmtNo)}
                    >
                      취소
                    </CommentBtn>
                  </CommentPropertyWrapper>
                </CommentContentWrapper>
              ) : (
                <CommentContentWrapper style={{ fontSize: "14px" }}>
                  <div
                    style={{ fontFamily: "NIXGONB-Vb-B" }}
                  >{`${comment.memName}`}</div>
                  <div>{`${comment.cmtContent}`}</div>
                  <CommentPropertyWrapper>
                    <span>{`${comment.cmtUpdateDate}`}</span>
                    <CommentBtn
                      style={{ padding: "0px 2px 0px 12px" }}
                      onclick={() => handleLikeComment(comment.cmtNo)}
                    >
                      ♡
                    </CommentBtn>
                    <span>{`${comment.cmtLike}`}</span>
                    <CommentBtn
                      style={{ marginLeft: "10px" }}
                      onClick={() =>
                        handleEditComment(comment.cmtNo, comment.mem_email)
                      }
                    >
                      수정
                    </CommentBtn>
                    <CommentBtn
                      onClick={() =>
                        handleDeleteComment(
                          comment.cmtContent,
                          comment.cmtNo,
                          comment.mem_email
                        )
                      }
                    >
                      삭제
                    </CommentBtn>
                  </CommentPropertyWrapper>
                </CommentContentWrapper>
              )}
            </>
          </CommentInnerContainer>
        ))}
        <CommentWriteFormContainer onSubmit={handleSubmitComment}>
          <CommentWriteForm
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          ></CommentWriteForm>
          <CommentSubmitBtn type="submit" onClick={handleSubmitComment}>
            등록
          </CommentSubmitBtn>
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
  padding: 10px 15px 10px 15px; /* 내부 여백 */
  /* 모바일 화면에 맞게 너비 조정 */
  width: calc(100%); /* 좌우 패딩값을 고려하여 너비 조정 */
  white-space: pre-line; /* 글 내용 줄바꿈 적용 */

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: calc(100%); /* 모바일에서도 동일한 너비 적용 */
  }
`;

const CommentInnerContainer = styled.div`
  border-bottom: 1px solid grey;
`;

const CommentContentWrapper = styled(PostProperty)`
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.4;
  margin-bottom: 0px;
  align-items: flex-start; /* Added to left-align content */
  & > div {
    margin: 2px 0; /* Added margin between the div elements */
  }
`;

const CommentPropertyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: #e2e2e2;
  margin: 5px 0px 10px 0px !important; /* margin 속성에 우선순위 부여 */
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
  padding: 0px 6px;
  background: none;
  font-size: 12px;
`;

const CommentWriteFormContainer = styled.form`
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
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */

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
