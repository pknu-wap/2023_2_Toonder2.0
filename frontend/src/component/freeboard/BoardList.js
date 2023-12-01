import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Pagination from "./Pagination";
import axios from "axios";

const PostContainer = styled.div`
  color: ${({ theme }) => theme.text};
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

  &:hover {
    cursor: pointer;
  }
`;

const PostProperty = styled.div`
  color: ${({ theme }) => theme.postProperty};
  font-size: 12px;
  margin: 10px 0px 20px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [commentsCounts, setCommentsCounts] = useState({}); // 상태 추가
  const [limit, setLimit] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const offset = (pageNum - 1) * limit;
  const navigate = useNavigate();
  const location = useLocation();

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board?p_num=${pageNum}`);
        setPosts(response.data);

        // 각 게시물의 댓글 수 가져오기
        const commentsCountsData = {};
        for (const post of response.data) {
          try {
            const commentResponse = await axios.get(`/toonder/board/${post.brdNo}/comment`);
            commentsCountsData[post.brdNo] = commentResponse.data.length;
          } catch (error) {
            console.log(`Failed to fetch comments for post ${post.brdNo}`);
            commentsCountsData[post.brdNo] = 0;
          }
        }
        setCommentsCounts(commentsCountsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNum]);

  // 글 작성 날짜 포맷 YY.MM.DD 형식으로 변경
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  return (
    <>
       {posts.map((post, index) => (
        <PostContainer key={index}>
          <PostTitle
            onClick={() => {
              navigate(`/postview`, {
                state: { brdNo: post.brdNo },
              });
            }}
          >
            {post.brdTitle}
          </PostTitle>
          <PostProperty style={{fontFamily:""}}>
            {`${post.mem_name} · ${formatDate(post.brdRegDate)} · 조회 ${post.brdViewCount} · 좋아요 ${post.brdLike} · 댓글 ${commentsCounts[post.brdNo] || 0}`}
          </PostProperty>
        </PostContainer>
      ))}
      {/* Pagination */}
      <Pagination
        total={posts.length}
        limit={limit}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </>
  );
}

export default BoardList;
