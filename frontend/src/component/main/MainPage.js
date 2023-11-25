import Header from "../background/Header";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase";
=======
>>>>>>> main

function MainPage() {
  // 접속한 사용자 이메일 불러오기
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem("loggedUserName")
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

      if (!localStorage.getItem("loggedUserName")) {
        axios
          .post("toonder/name", requestData)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
            localStorage.setItem(
              "loggedUserName",
              loggedUserData.data.mem_name
            );
          })
          .catch((error) => console.log(error));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header title="TOONDER" subtitle="당신이 찾는 모든 웹툰에 대해" />
    </>
  );
}

export default MainPage;
