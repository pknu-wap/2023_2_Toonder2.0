import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hashtagOptions } from "./hashtagOptions";
import { Btn } from "../login/LoginPage";
import Header from "../background/Header";
import styles from "./JoinPage.module.css";
import axios from "axios";
import supabase from "../supabase";

function JoinPageStep2() {
  const { state } = useLocation(); // useLocation() : useNavigate()로 넘겨받은 파라미터를 취득함
  const navigate = useNavigate();
  const [notAllow, setNotAllow] = useState(true); // '완료' 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  useEffect(() => {
    if (selectedHashtags.length > 0) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [selectedHashtags]);

  const handleSubmit = async (e) => {
    // setLoading(true);
    const { email, pw, firstName, lastName } = state;
    // 체크박스로 입력받은 해시태그는 공백으로 단어가 분리된 문자열로 저장을 해서 데이터로 보냄
    const hashtag = "#" + selectedHashtags.join(" #");

    axios
      .post("toonder/join", {
        mem_email: email,
        mem_name: lastName + firstName,
        mem_hashtag: hashtag,
      })
      .catch(function () {
        console.log("Error for sending user data to Spring - creating member");
      });

    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
    });

    if (error) {
      alert(error);
      // setLoading(false);
    } else {
      alert("인증 메일을 발송했습니다. 이메일 확인 후 로그인해주세요.");
      navigate("/"); // 메인 화면으로 리다이렉트
    }
  };

  const handleCheckbox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHashtags((prevSelectedHashtags) => [
        ...prevSelectedHashtags,
        value,
      ]);
    } else {
      setSelectedHashtags((prevSelectedHashtags) =>
        prevSelectedHashtags.filter((hashtag) => hashtag !== value)
      );
    }
  };

  return (
    <>
        <Header title="회원가입"></Header>
        <div style={{ color: "#efefef", marginBottom: "20px" }}>
          좋아하는 웹툰 장르를 1개 이상 선택하세요
        </div>
        <div className={styles.CheckboxContainer}>
          {hashtagOptions.map((hashtag) => (
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                className={styles.CheckboxInput}
                value={hashtag}
                onChange={handleCheckbox}
              />
              {hashtag}
            </label>
          ))}
        </div>
        <Btn
          style={{
            // input들이 정확히 입력되지 않았을 때는 버튼 색이 원래의 50%만큼 투명하게 보이도록 설정
            backgroundColor: notAllow ? "#6e6e6e66" : "#6e6e6e",
          }}
          type="submit"
          onClick={handleSubmit}
          disabled={notAllow}
        >
          완료
        </Btn>
    </>
  );
}

export default JoinPageStep2;
