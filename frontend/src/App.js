import React from "react";
import "./App.css";
import { Container } from "./component/background/Container";
import MainPage from "./component/main/MainPage";
import LoginPage from "./component/login/LoginPage";
import FindPwPage from "./component/find/FindPwPage";
import NewPwPage from "./component/find/NewPwPage";
import JoinPageStep1 from "./component/join/JoinPageStep1";
import JoinPageStep2 from "./component/join/JoinPageStep2";
import { Routes, Route, Link } from "react-router-dom";
import LoginHandler from "./component/login/LoginHandler";
import supabase from "./component/supabase";
import { Footer } from "./component/background/Footer";
import Navbar from "./component/background/Navbar";

function App() {
  document.title = "툰더";

  return (
    <div className="App">
      <Container>
        <Navbar />

        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join/step1" element={<JoinPageStep1 />} />
          <Route path="/join/step2" element={<JoinPageStep2 />} />
          <Route path="/findpw" element={<FindPwPage />}></Route>
          <Route path="/newpw" element={<NewPwPage />}></Route>
          <Route path="/user/kakao/callback" element={<LoginHandler />}></Route>
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
