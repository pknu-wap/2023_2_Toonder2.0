import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../background/Header";
import styled from "styled-components";
import Pagination from "./Pagination";

const PostContainer = styled.div`
  color: #e2e2e2;
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
  color: #d8d8d8;
  font-size: 12px;
  margin: 10px 0px 20px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

function BoardList() {
  const [jsonData, setJsonData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("p_num", String(page));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }, [page, navigate, location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./postdata.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {jsonData.slice(offset, offset + limit).map((post, index) => (
        <PostContainer key={index}>
          <PostTitle
            onClick={() => {
              navigate(`/postview`, {
                state: {brdNo: post.brdNo}, 
              });
            }}
          >
            {post.brdTitle}
          </PostTitle>
          <PostProperty>
            {`${post.brdUpdateDate} · 조회 ${post.brdViewCount} · 좋아요 ${post.brdLike} · 작성자 ${post.member}`}
          </PostProperty>
        </PostContainer>
      ))}
      {/* Pagination */}
      <Pagination
        total={jsonData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

export default BoardList;
