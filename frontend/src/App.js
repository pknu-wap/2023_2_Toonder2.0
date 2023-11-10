import React, { useState, useEffect } from "react";
import "./App.css";
import { Container } from "./component/background/Container";
import MainPage from "./component/main/MainPage";
import LoginPage from "./component/login/LoginPage";
import FindPwPage from "./component/find/FindPwPage";
import NewPwPage from "./component/find/NewPwPage";
import JoinPageStep1 from "./component/join/JoinPageStep1";
import JoinPageStep2 from "./component/join/JoinPageStep2";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginHandler from "./component/login/LoginHandler";
import supabase from "./component/supabase";
import { Footer } from "./component/background/Footer";
import Navbar from "./component/background/Navbar";
import { AuthProvider } from "./AuthContext";

function App() {
  document.title = "툰더";

  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인된 상태인지 확인
    const checkLoggedIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session !== null) {
        // 이미 로그인된 상태라면 메인 페이지로 이동
        console.log("로그인되어 있습니다.");
        setLoggedIn(true);
      } else {
        console.log("로그아웃되어 있습니다.");
        setLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Container>
          <Navbar isLoggedIn={isLoggedIn} />

          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/join/step1" element={<JoinPageStep1 />} />
            <Route path="/join/step2" element={<JoinPageStep2 />} />
            <Route path="/findpw" element={<FindPwPage />}></Route>
            <Route path="/newpw" element={<NewPwPage />}></Route>
            <Route
              path="/user/kakao/callback"
              element={<LoginHandler />}
            ></Route>
          </Routes>
          <Footer />
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
