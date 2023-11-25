// import { createContext, useContext, useState, useEffect } from "react";
// import supabase from "./component/supabase";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoggedIn = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       const session = data?.session;

//       if (session !== null) {
//         console.log("로그인되어 있습니다.");
//         setLoggedIn(true);
//       } else {
//         console.log("로그아웃되어 있습니다.");
//         setLoggedIn(false);
//       }
//     };

//     checkLoggedIn();
//   }, []);

//   const login = () => {
//     // 로그인 로직을 여기에 추가
//     // setLoggedIn(true);
//   };

//   const logout = async () => {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       console.error("로그아웃 중 오류가 발생했습니다.", error);
//     } else {
//       // 로그아웃 성공시 메인으로 리다이렉트
//       alert("로그아웃되었습니다.");
//       window.location.replace("/");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
