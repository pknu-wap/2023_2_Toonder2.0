import React, { useState } from "react";
import Header from "../background/Header";
import { Input, Btn } from "../login/LoginPage";

function FindPwPage() {
  return (
    <>
        <Header title="비밀번호 초기화" />
        <Input type="id" placeholder="비밀번호를 입력하세요" />
        <Btn>코드 발송</Btn>
    </>
  );
}

export default FindPwPage;
