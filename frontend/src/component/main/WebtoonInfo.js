import Header from "../background/Header";
import Navbar from "../background/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../supabase";
import axios from "axios";
import HoverRating from "./HoverRating";

function WebtoonInfo() {
  const [jsonData, setJsonData] = useState([]);
  const { state } = useLocation();
  // const { mastrId } = state;
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("안시현");
  const [review, setReview] = useState("");
  const [reviewRating, setReviewRating] = useState(0); // 별점 상태 관리를 위한 useState 추가

  // useEffect(() => {
  //   setUserEmailForStart();
  // }, []);

  // 사용자 이메일, 닉네임 불러오기
  // const setUserEmailForStart = async () => {
  //   const { data, error } = await supabase.auth.getSession();
  //   const session = data.session;
  //   setUserEmail(session.user.email);
  //   // setUserName(localStorage.getItem('loggedUserName'));
  //   console.log(userName); // 테스트
  // };

  // 리뷰 등록 - 작성한 리뷰 백엔드로 전송 sendingReviewToBackEnd
  const handleSubmitReview = async (e) => {
    if (!reviewRating) {
      alert("별점을 매겨주세요.");
      return;
    }

    if (!review) {
      alert("리뷰를 입력하세요.");
      return;
    }

    const reviewData = {
      revContent: review,
      revRating: reviewRating,
      // memName: localStorage.getItem('loggedUserName'),
      mem_email: userEmail,
    };

    console.log(reviewData);

    // 백엔드 서버 연결 후 주석 해제
    // axios
    //   .post("toonder/webtoon/" + mastrId + "/review", reviewData)
    //   .then((res) => {
    //     //console.log(res.data);
    //     // setReviewList(reviewList.concat(res.data));
    //   })
    //   .catch((error) => console.log(error));

    setReview("");

    // setRegRateValue(5.0);
    // setOpenModalForConfirm(false);
    // setOpenModalConfirmMessage(true);
  };

  // 리뷰 수정

  // 리뷰 삭제
  const handleDeleteReview = (revNo, review) => {
    const reviewData = {
      revContent: review.revContent,
      revRating: review.revRating,
      mem_name: review.memName,
      mem_email: review.memEmail,
    };
    console.log(revNo);
    console.log(reviewData);
    // console.log('toonder/webtoon/' + mastrId + '/review/' + revNo);

    // 백엔드 서버 연결 후 주석 해제
    // axios
    //   .delete('toonder/webtoon/' + mastrId + '/review/' + revNo, {
    //     data: reviewData,
    //   })
    //   .catch((error) => console.log(error));

    // setReviewList(reviewList.filter((review) => review.revNo !== revNo));
  };

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
      <Header title="웹툰 정보" />
      <BoardContainer>
        <InfoContainer>
          <ThumbnailWrapper
            src={process.env.PUBLIC_URL + "/webtoon_thumbnail.jpg"}
            alt="webtoon_thumbnail"
            width="150px"
            height="auto"
          />
          <InfoWrapper>
            <div style={{ fontSize: "24px" }}>{jsonData.title}</div>
            <div>
              {/* 글 작가가 따로 없는 경우 '글/그림 | 작가명' 출력 */}
              {jsonData.sntncWritrNm === "" ? (
                <div>글/그림 | {jsonData.pictrWritrNm}</div>
              ) : (
                <div>
                  글 | {jsonData.sntncWritrNm} · 그림 | {jsonData.pictrWritrNm}
                </div>
              )}
            </div>
            <div>장르 | {jsonData.mainGenreCdNm}</div>
            <div>연재처 | {jsonData.pltfomCdNm}</div>
            <div>
              평균별점 |{" "}
              {jsonData.review &&
                (
                  jsonData.review.reduce(
                    (acc, curr) => acc + curr.revRating,
                    0
                  ) / jsonData.review.length
                ).toFixed(1)}
            </div>
            <BoardBtn>즐겨찾기</BoardBtn>
          </InfoWrapper>
        </InfoContainer>

        {/* 줄거리 */}
        <div style={{ marginTop: "30px" }}>줄거리</div>
        <ContentWrapper>{jsonData.outline}</ContentWrapper>

        {/* 리뷰 */}
        <div style={{ marginTop: "30px" }}>리뷰</div>
        <ContentWrapper>
          {jsonData.review &&
            jsonData.review.map((review) => (
              <ReviewWrapper key={review.revNo}>
                <ReviewContent>{review.revContent}</ReviewContent>
                <ReviewProperty>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>{review.memName}</div>
                    {review.memName === userName && (
                      <div style={{ marginLeft: "10px" }}>
                        <ReviewActionBtn>수정</ReviewActionBtn>
                        <ReviewActionBtn
                          onClick={() =>
                            handleDeleteReview(review.revNo, review)
                          }
                        >
                          삭제
                        </ReviewActionBtn>
                      </div>
                    )}
                  </div>
                  <div>
                    <HoverRating
                      value={review.revRating}
                      size="small"
                      readOnly={true}
                    />
                  </div>
                </ReviewProperty>
              </ReviewWrapper>
            ))}
        </ContentWrapper>

        {/* 리뷰 작성 폼 */}
        <ReviewWriteFormContainer onSubmit={handleSubmitReview}>
          <RatingWrapper>
            <span style={{ marginRight: "10px" }}>내 별점</span>
            <HoverRating
              value={reviewRating}
              onChange={(e) => setReviewRating(e)} // 상위 컴포넌트의 상태 업데이트
            />
          </RatingWrapper>
          <ReviewWriteForm
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="리뷰를 작성해보세요!"
          ></ReviewWriteForm>
          <ReviewSubmitBtn type="submit">등록</ReviewSubmitBtn>
        </ReviewWriteFormContainer>
      </BoardContainer>
    </>
  );
}

// PostView 컴포넌트에서 styled component import

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 100px; // Footer와의 간격
  text-align: center;
  font-size: 20px;
  align-items: flex-start; /* 왼쪽 정렬로 변경 */
  color: ${({ theme }) => theme.text};
  transition: box-shadow 0.3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  min-height: 100vh;
  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    max-width: 100%; /* 모바일 화면에서 가로 길이를 100%로 설정 */
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 왼쪽 정렬로 변경 */
`;

const ThumbnailWrapper = styled.img`
  margin-right: 20px;
  border-radius: 10px; /* 테두리를 둥글게 설정 */
  overflow: hidden; /* 테두리를 둥글게 만들기 위해 추가 */

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: 150px; /* 모바일에서 이미지 크기 줄임 */
  }
`;

const InfoWrapper = styled.div`
  font-size: 15px;
  text-align: left;
  margin-top: 10px;

  > div {
    margin-bottom: 15px; /* 각 div 요소의 아래쪽 여백 설정 */
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  text-align: left;
  white-space: pre-line; /* 글 내용 줄바꿈 적용 */
  border: 1.5px solid;
  border-color: ${({ theme }) => theme.containerBorder};
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 0px; // Footer와의 간격
  width: 500px;
  margin-top: 10px;
  max-height: 200px;
  padding: 20px 15px 20px 15px; /* 내부 여백 */
  overflow-y: auto;

  /* 미디어 쿼리 추가 */
  @media (max-width: 540px) {
    width: 96vw;
  }
`;

export const BoardBtn = styled.button`
  display: center;
  font-family: "NIXGONM-Vb";
  background-color: #6e6e6e;
  border: none;
  color: #efefef;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 16px;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ReviewWriteFormContainer = styled.form`
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px; /* 버튼과의 간격 조정 */
`;

const ReviewWriteForm = styled.textarea`
  font-family: "NIXGONM-Vb";
  display: flex;
  border: 1.5px solid;
  border-color: ${({ theme }) => theme.commentForm};
  font-size: 15px;
  color: #efefef;
  background: ${({ theme }) => theme.commentForm};
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 10px 0px 10px 0px;
  padding: 10px 10px 50px 10px; /* 내부 여백 */
  resize: none;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */

  &:focus {
    outline: none;
    color: #efefef;
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholderText};
  }
`;

const ReviewActionBtn = styled.button`
  font-family: "NIXGONM-Vb";
  color: #d8d8d8;
  border: none;
  background: none;
  cursor: pointer;
`;
const ReviewSubmitBtn = styled.button`
  font-family: "NIXGONM-Vb";
  font-size: 15px;
  width: 100%;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.commentForm};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid #ccc;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
`;

const ReviewContent = styled.div`
  font-size: 16px;

  @media (max-width: 540px) {
    font-size: 16px; /* 모바일에서 글제목 크기 */
  }
`;

const ReviewProperty = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.postProperty};
  font-size: 14px;
  margin: 10px 0px 10px 0;
  @media (max-width: 540px) {
    font-size: 12px; /* 모바일에서 글 속성 크기 */
  }
`;

const RatingWrapper = styled(ReviewProperty)`
  font-size: 16px;
  justify-content: flex-start;
`;

export default WebtoonInfo;
