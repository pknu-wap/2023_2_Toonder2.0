import React from "react";
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";

const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}\
&redirect_uri=${kakaoRedirectUri}&response_type=code`;

const KakaoLoginButton = () => {
  return (
    <div style={{ margin: "20px" }}>
      <a href={loginUrl} rel="noopener noreferrer">
        <img
          src={process.env.PUBLIC_URL + "/kakaoLoginImg.png"}
          alt="kakaoLoginImg"
          width="48px"
          height="auto"
        />
      </a>
    </div>
  );
};

export default KakaoLoginButton;
