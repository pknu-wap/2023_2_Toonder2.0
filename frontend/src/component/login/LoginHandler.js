import React, { useEffect, useState } from "react";
import axios from 'axios';
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
    
    const navigate = useNavigate()


  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    const grantType = "authorization_code";
    const REST_API_KEY = kakaoClientId;
    const REDIRECT_URI = kakaoRedirectUri;



    axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
    )
    .then((res: any) => {
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
            console.log(res)
            console.log(res.data.kakao_account.email)
            console.log('2번째 호출', res.data.properties.nickname);
            console.log('2번째 호출', res.data.properties.profile_image);
            const email = res.data.kakao_account.email
            const name = res.data.properties.nickname
            const firstName = name.substring(1,name.length) 
            const lastName = name[0]
            const pw = ''
            const snsLogin = 'kakao'
            navigate("/join/step2", {
                state: { email, pw, firstName, lastName, snsLogin },
              });
        })
    })
    .catch((Error: any) => { 
        navigate("/login")
        console.log(Error)
    })

}, [])

return(
    <>
    </>
)
}
export default LoginRedirect;

