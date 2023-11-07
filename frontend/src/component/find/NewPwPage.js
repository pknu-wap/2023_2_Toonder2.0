import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../background/Header";
import { Input, Btn } from "../login/LoginPage";
import supabase from "../supabase";
import { PwInput } from "../login/LoginPage";
import styled from "styled-components";

const ErrorMsg = styled.div`
  font-size: 12px;
  color: #ff5722;
`;

function NewPwPage() {
  const [pw, setPw] = useState(""); //비밀번호 값
  const [pwc, setPwc] = useState(""); //비밀번호 확인 값
  const [isPwCheck, setIsPwCheck] = useState(false); //비밀번호 확인 여부
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성 여부
  const navigate = useNavigate();
  const [notAllow, setNotAllow] = useState(true);
  const [pwErrorMsg, setPwErrorMsg] = useState(""); // 비밀번호 유효성 에러 메시지 내용
  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState(""); // 비밀번호 확인 에러 메시지 내용

  const removeToken = () => {
    // 토큰 삭제 로직 구현
    supabase.auth.signOut();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      await supabase.auth.updateUser({ password: pw });
      alert("비밀번호 재설정이 완료되었습니다.");
      removeToken(); // 재설정이 완료되면 토큰을 삭제
      navigate('/'); // 메인으로 리다이렉트
    } catch (error) {
      console.error(error);
      alert("비밀번호 재설정이 실패하였습니다. 다시 시도해주세요");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (isPwCheck & isPwValid) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isPwCheck, isPwValid]);

  // 비밀번호 유효성 검사
  const handlePw = (e) => {
    const newPw = e.target.value;
    setPw(newPw);

    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (newPw.length === 0) {
      setIsPwValid(false);
      setPwErrorMsg("");
    } else if (!regex.test(newPw)) {
      setIsPwValid(false);
      setPwErrorMsg("영문, 숫자 포함해 8자 이상 입력해주세요");
    } else {
      setIsPwValid(true);
      setPwErrorMsg("");
    }
  };

  // 비밀번호 확인 검사
  const handleCheckPw = (e) => {
    const newPwc = e.target.value;
    setPwc(newPwc);

    if (newPwc.length === 0) {
      setIsPwCheck(false);
      setPwCheckErrorMsg("");
    } else if (newPwc !== pw) {
      setIsPwCheck(false);
      setPwCheckErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setIsPwCheck(true);
      setPwCheckErrorMsg("");
    }
  };

  return (
    <>
      <Header title="비밀번호 재설정" />
      <form onSubmit={handleSubmit}>
        <PwInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={handlePw}
        />
        <ErrorMsg>{pwErrorMsg}</ErrorMsg>
        <PwInput
          type="password"
          placeholder="비밀번호를 한 번 더 정확히 입력해주세요"
          value={pwc}
          onChange={handleCheckPw}
        />
        <ErrorMsg>{pwCheckErrorMsg}</ErrorMsg>
        <Btn
          style={{
            // input들이 정확히 입력되지 않았을 때는 버튼 색이 원래의 50%만큼 투명하게 보이도록 설정
            backgroundColor: notAllow ? "#6e6e6e66" : "#6e6e6e",
          }}
          type="submit"
          disabled={notAllow}
        >
          완료
        </Btn>
      </form>
    </>
  );
}

export default NewPwPage;
