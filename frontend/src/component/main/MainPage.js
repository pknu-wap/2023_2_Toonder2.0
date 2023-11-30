import Header from "../background/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase";
import styled from "styled-components";

const RecommandWebtoonArea = styled.div`
  overflow: hidden;
  scroll: yes;
  margin-top: 20px;

  width: 80%;
`;

const Subtitle = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  letter-spacing: "2px";
  border-bottom: 1px solid white;
  padding: 10px;
  width: 60%;
`;

const DivTitle = styled.div`
  text-align: left;
  margin-top: 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

function MainPage() {
  // 사용자 이름 불러오기
  const [loggedUserName, setLoggedUserName] = useState('');

  // 로컬 스토리지에 사용자 이름 저장
  useEffect(() => {
    const fetchData = async () => {

      const email = localStorage.getItem('loggedUserEmail')

      const rdata = {
        email: email,
      };

      axios
        .post("toonder/name", rdata)
        .then((loggedUserData) => {
          const userName = loggedUserData.data.mem_name;
          setLoggedUserName(userName);

          localStorage.setItem("loggedUserName", userName);
          console.log(userName);
        })
        .catch((error) => {
          console.log(error)
          setLoggedUserName('')});

    };
    console.log(loggedUserName)
    fetchData();
    
  }, []);

  return (
    <>
      <Header title="TOONDER" subtitle="당신이 찾는 모든 웹툰에 대해" />

      <Subtitle>오늘 {loggedUserName === '' ? '???' : loggedUserName} 님이 볼만한 웹툰!</Subtitle>

      <RecommandWebtoonArea>
        <DivTitle>좋아하시는 장르가 비슷해요.</DivTitle>
        <DivTitle>좋아하시는 그림체가 비슷해요.</DivTitle>
        <DivTitle>좋아하시는 줄거리가 비슷해요.</DivTitle>
        <DivTitle>좋아하시는 작가님의 다른 작품이에요.</DivTitle>
      </RecommandWebtoonArea>
    </>
  );
}

export default MainPage;
