import React, { useEffect } from "react";
import axios from 'axios';
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";

const LoginRedirect = () => {
  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    console.log(code);
    const grantType = "authorization_code";
    const REST_API_KEY = kakaoClientId;
    const REDIRECT_URI = kakaoRedirectUri;

    axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
    )
    .then((res: any) => {
        console.log('-------------')
        console.log(res);
        const { access_token } = res.data;
        axios.post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            }
        )
        .then((res: any) => {
            console.log('2번쨰', res);
        })
    })
    .catch((Error: any) => {
        console.log(Error)
    })
}, [])

return(
    <>
    </>
)
}
export default LoginRedirect;

