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
  const [limit, setLimit] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const offset = (pageNum - 1) * limit;
  const navigate = useNavigate();
  const location = useLocation();

  // 글 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board?p_num=${pageNum}`);
        setPosts(response.data);
        let total = pageNum;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await axios.get(`/toonder/board?p_num=${total + 1}`);
          if (response.data.length === 0) {
            hasMorePages = false;
          } else {
            total++;
          }
        }

        setTotalPages(total);
        // // setLoading(false);
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
          <PostProperty>
            {`${post.mem_name} · ${formatDate(post.brdRegDate)} · 조회 ${post.brdViewCount} · 좋아요 ${post.brdLike}`}
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
