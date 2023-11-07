import React, { useState, useEffect } from "react";
import Header from "../background/Header";
import { Input, Btn } from "../login/LoginPage";
import supabase from "../supabase";
import styled from "styled-components";

const ErrorMsg = styled.div`
  font-size: 12px;
  color: #ff5722;
`;

function FindPwPage() {
  const [email, setEmail] = useState(""); // 이메일 값
  const [isEmailValid, setEmailValid] = useState(false); // 이메일 유효성 여부
  const [errorMsg, setErrorMsg] = useState(""); // 이메일 유효성 에러 메시지
  const [notAllow, setNotAllow] = useState(true); // '코드 발송' 버튼 활성화 여부
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 이메일이 정확하게 입력되지 않았다면 '코드 발송' 버튼 비활성화
    if (isEmailValid) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isEmailValid]);

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(e.target.value);

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (newEmail.length === 0) {
      setEmailValid(false);
      setErrorMsg("");
    } else if (!regex.test(newEmail)) {
      setEmailValid(false);
      setErrorMsg("올바른 이메일을 입력하세요");
    } else {
      setEmailValid(true);
      setErrorMsg("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/newpw",
      });
      alert("비밀번호 재설정 링크가 입력하신 이메일로 보내졌습니다");
    } catch (error) {
      console.error(error);
      alert("비밀번호 재설정이 실패했습니다. 다시 시도해주세요.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <Header title="비밀번호 초기화" />
      <form onSubmit={handleResetPassword}>
        <Input
          type="id"
          onChange={handleEmail}
          placeholder="이메일을 입력해주세요"
        />
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <Btn
          style={{
            // input들이 정확히 입력되지 않았을 때는 버튼 색이 원래의 50%만큼 투명하게 보이도록 설정
            backgroundColor: notAllow ? "#6e6e6e66" : "#6e6e6e",
          }}
          type="submit"
          disabled={notAllow}
        >
          코드 발송
        </Btn>
      </form>
    </>
  );
}

export default FindPwPage;
