import Header from "../background/Header";
import Navbar from "../background/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../supabase";
import axios from "axios";
import HoverRating from "./HoverRating";
import {
  BoardContainer,
  InfoContainer,
  ContentWrapper,
  InfoWrapper,
  ReviewWrapper,
  ReviewProperty,
} from "./WebtoonInfo";

function MyPage() {
  const navigate = useNavigate();

  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem("loggedUserName")
  );
  const [loggedUserHashTag, setLoggedUserHashTag] = useState(
    localStorage.getItem("loggedUserHashTag")
  );
  const [jsonData, setJsonData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [brdNo, setBrdNo] = useState([]);

  // 사용자 이메일, 해시태그, 최근 쓴 글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await supabase.auth.getSession();
        const email = sessionData.data.session.user.email;
        const requestData = { email };

        const [hashData, nameData, boardRes] = await Promise.all([
          axios.post("toonder/mypage", requestData),
          axios.post("toonder/name", requestData),
          axios.post("toonder/mypage/board/", requestData),
        ]);

        setLoggedUserHashTag(hashData.data.mem_hashtag);
        localStorage.setItem("loggedUserHashTag", hashData.data.mem_hashtag);

        setLoggedUserName(nameData.data.mem_name);
        localStorage.setItem("loggedUserName", nameData.data.mem_name);

        const data = boardRes.data;
        const reversedData = [...data].reverse();
        const titles = reversedData.map((review) => review.brdTitle);
        const brdNo = reversedData.map((review) => review.brdNo);
        setBoardData(titles);
        setBrdNo(brdNo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 최근 쓴 리뷰 - 테스트용 정적 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./webtoondata.json");
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
      <Header title="마이페이지" />
      <BoardContainer>
        {/* 사용자 정보 표시 */}
        <Container>
          <InfoWrapper>
            <div style={{ fontSize: "20px", fontFamily: "NIXGONB-Vb-B" }}>
              {loggedUserName}
              <span style={{ color: "#F2ACAC" }}>{` ♥`}</span>
            </div>
            <div>{`${loggedUserHashTag}`}</div>
          </InfoWrapper>
        </Container>

        {/* 최근 쓴 리뷰 */}
        <div style={{ marginTop: "30px" }}>최근 쓴 리뷰</div>
        <Container>
          {jsonData.review &&
            jsonData.review.map((review) => {
              if (review.memName === loggedUserName) {
                return (
                  <Content key={review.revNo}>
                    <MyReview>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{ marginRight: "10px" }}
                        >{`[${jsonData.title}]`}</div>
                        {review.revContent}
                      </div>
                      <div>
                        <HoverRating
                          value={review.revRating}
                          size="small"
                          readOnly={true}
                        />
                      </div>
                    </MyReview>
                  </Content>
                );
              }
              return null; // 웹툰 제목이 일치하지 않는 경우는 아무것도 반환하지 않습니다.
            })}
        </Container>

        {/* 최근 쓴 글 */}
        <div style={{ marginTop: "30px" }}>최근 쓴 글</div>
        <Container>
          {boardData &&
            boardData.slice(0, 3).map((title, index) => (
              <Content key={index}>
                <MyPost>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {title}
                  </div>
                </MyPost>
              </Content>
            ))}
        </Container>
      </BoardContainer>
    </>
  );
}

// Webtoon Info 컴포넌트에서 styled component import
const Container = styled(ContentWrapper)``;

const Content = styled(ReviewWrapper)``;

export const MyReview = styled(ReviewProperty)`
  font-size: 16px;
`;

const MyPost = styled(MyReview)``;

export default MyPage;
