import React, { useState, useEffect } from "react";
import "./App.css";
import { Container } from "./component/background/Container";
import MainPage from "./component/main/MainPage";
import LoginPage from "./component/login/LoginPage";
import FindPwPage from "./component/find/FindPwPage";
import NewPwPage from "./component/find/NewPwPage";
import JoinPageStep1 from "./component/join/JoinPageStep1";
import JoinPageStep2 from "./component/join/JoinPageStep2";
import BoardList from "./component/freeboard/BoardList";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginHandler from "./component/login/LoginHandler";
import supabase from "./component/supabase";
import { Footer } from "./component/background/Footer";
import WebtoonInfo from "./component/main/WebtoonInfo";
import Navbar from "./component/background/Navbar";
import { AuthProvider } from "./AuthContext";
import PostView from "./component/freeboard/PostView";
import PostForm from "./component/freeboard/PostForm";
import BoardLayout from "./component/freeboard/BoardLayout";
import EditForm from "./component/freeboard/EditForm";

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
            <Route element={<BoardLayout />}>
              <Route path="board" element={<BoardList />} />
              <Route path="postview" element={<PostView />} />
              <Route path="postform" element={<PostForm />} />
              <Route path="/edit/:brdNo" element={<EditForm />} />
            </Route>
            <Route
              path="/user/kakao/callback"
              element={<LoginHandler />}
            ></Route>
            <Route path="/webtooninfo" element={<WebtoonInfo />}></Route>
          </Routes>
          <Footer />
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
