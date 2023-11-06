import React, { useState, useEffect } from "react";
import Header from "../background/Header";
import { useNavigate } from "react-router-dom";
import { Input, PwInput, Btn } from "../login/LoginPage";
import styles from "./JoinPage.module.css";
// import { IconName } from "react-icons/fa";

function JoinPageStep1() {
  const [firstName, setFirstName] = useState(""); // 이름 값
  const [lastName, setLastName] = useState(""); // 성씨 값
  const [email, setEmail] = useState(""); // 이메일 값
  const [isEmailValid, setEmailValid] = useState(false); // 이메일 유효성 여부
  const [emailErrorMsg, setEmailErrorMsg] = useState(""); // 이메일 유효성 에러 메시지 내용
  const [pw, setPw] = useState(""); // 비밀번호 값
  const [pwc, setPwc] = useState(""); //비밀번호 확인 값
  const [isPwValid, setIsPwValid] = useState(false); // 비밀번호 유효성 여부
  const [isPwCheck, setIsPwCheck] = useState(false); // 비밀번호 확인 여부
  const [pwErrorMsg, setPwErrorMsg] = useState(""); // 비밀번호 유효성 에러 메시지 내용
  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState(""); // 비밀번호 확인 에러 메시지 내용
  const [notAllow, setNotAllow] = useState(true); // '다음' 버튼 활성화 여부
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // User 정보들이 정확하게 입력되지 않았다면 '다음' 버튼 비활성화
    if (
      isEmailValid &&
      isPwCheck &&
      isPwValid &&
      firstName.length > 0 &&
      lastName.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isEmailValid, isPwValid, isPwCheck, firstName, lastName]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(e.target.value);

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (newEmail.length === 0) {
      setEmailValid(false);
      setEmailErrorMsg("");
    } else if (!regex.test(newEmail)) {
      setEmailValid(false);
      setEmailErrorMsg("올바른 이메일을 입력해주세요");
    } else {
      setEmailValid(true);
      setEmailErrorMsg("");
    }
  };

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

  // '다음' 버튼 submit
  const handleSubmit = async (e) => {
    // setLoading(true);
    // useNavigate() : 첫번째 인자 '/join/step2'로 이동하면서 입력한 User 정보(email, pw, firstName, lastName)들을 파라미터로 넘겨준다
    navigate("/join/step2", {
      state: { email, pw, firstName, lastName },
    });
  };

  return (
    <>
        <Header title="회원가입" />
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            onChange={handleLastName}
            id="lastName"
            placeholder="성"
          />
          <Input
            type="text"
            onChange={handleFirstName}
            id="firstName"
            placeholder="이름"
          />
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
          <div className={styles.errorMsgStyle}>{emailErrorMsg}</div>
          <PwInput
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={handlePw}
          />
          <div className={styles.errorMsgStyle}>{pwErrorMsg}</div>
          <PwInput
            type="password"
            placeholder="비밀번호 확인"
            value={pwc}
            onChange={handleCheckPw}
          />
          <div className={styles.errorMsgStyle}>{pwCheckErrorMsg}</div>
          <Btn
            style={{
              marginBottom: "50px",
              // input들이 정확히 입력되지 않았을 때는 버튼 색이 원래의 50%만큼 투명하게 보이도록 설정
              backgroundColor: notAllow ? "#6e6e6e66" : "#6e6e6e",
            }}
            type="submit"
            disabled={notAllow}
          >
            다음
          </Btn>
        </form>
    </>
  );
}

export default JoinPageStep1;
