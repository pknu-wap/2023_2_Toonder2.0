import Header from "../background/Header";
import Navbar from "../background/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem("loggedUserName")
  );
  const [loggedUserHashTag, setLoggedUserHashTag] = useState(
    localStorage.getItem("loggedUserHashTag")
  );
  const [jsonData, setJsonData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [brdNo, setBrdNo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

      console.log(requestData);
      
      axios
        .post("toonder/mypage", requestData)
        .then((hashData) => {
          setLoggedUserHashTag(hashData.data.mem_hashtag);
          localStorage.setItem("loggedUserHashTag", hashData.data.mem_hashtag);
        })
        .catch((error) => console.log(error));

      if (!localStorage.getItem("loggedUserName")) {
        axios
          .post("toonder/name", requestData)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
            localStorage.setItem(
              "loggedUserName",
              loggedUserData.data.mem_name
            );
          })
          .catch((error) => console.log(error));
      }

      //내 게시글 불러오기
      axios
        .post("toonder/mypage/board/", requestData)
        .then((boardRes) => {
          const data = boardRes.data; // 받아온 게시글 데이터
          const reversedData = [...data].reverse();
          const titles = reversedData.map((review) => review.brdTitle);
          const brdNo = reversedData.map((review) => review.brdNo);
          setBoardData(titles);
          console.log("내가 쓴 글", boardData);
          setBrdNo(brdNo);
          // setIsBoardLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
        });

      // 리뷰 불러오기
      //   axios
      //     .post("/toonder/mypage/review", requestData)
      //     .then((reviewRes) => {
      //       const data = reviewRes.data; // 받아온 리뷰 데이터
      //       const reversedData = [...data].reverse();
      //       const titles = reversedData.map((review) => review.webtoon.title);
      //       const contents = reversedData.map((review) => review.revContent);
      //       const webId = reversedData.map((review) => review.webtoon.mastrId);
      //       setwebId(webId);
      //       setWebtoonTitles(titles);
      //       setReviewData(contents);

      //       setIsReviewLoading(false);
      //     })
      //     .catch((error) => {
      //       console.log("Error:", error);
      //     });
      // };
    };

    fetchData();
  }, []);

  // 테스트용 정적 데이터 불러오기
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
        <ContentWrapper>
          <InfoWrapper>
            <div style={{ fontSize: "20px", fontFamily: "NIXGONB-Vb-B" }}>
              {loggedUserName}
            </div>
            <div>{loggedUserHashTag}</div>
          </InfoWrapper>
        </ContentWrapper>

        {/* 최근 쓴 리뷰 */}
        <div style={{ marginTop: "30px" }}>최근 쓴 리뷰</div>
        <ContentWrapper>
          {jsonData.review &&
            jsonData.review.map((review) => {
              if (review.memName === loggedUserName) {
                return (
                  <ReviewWrapper key={review.revNo}>
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
                  </ReviewWrapper>
                );
              }
              return null; // 웹툰 제목이 일치하지 않는 경우는 아무것도 반환하지 않습니다.
            })}
        </ContentWrapper>

        {/* 최근 쓴 글 */}
        <div style={{ marginTop: "30px" }}>최근 쓴 글</div>
        <ContentWrapper>
          {jsonData.review &&
            jsonData.review.map((review) => {
              if (review.memName === loggedUserName) {
                return (
                  <ReviewWrapper key={review.revNo}>
                    <MyPost>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {review.revContent}
                      </div>
                    </MyPost>
                  </ReviewWrapper>
                );
              }
              return null; // 웹툰 제목이 일치하지 않는 경우는 아무것도 반환하지 않습니다.
            })}
        </ContentWrapper>
      </BoardContainer>
    </>
  );
}

// Webtoon Info 컴포넌트에서 styled component import
export const MyReview = styled(ReviewProperty)`
  font-size: 15px;
`;

const MyPost = styled(MyReview)``;

export default MyPage;
