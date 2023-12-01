import Header from "../background/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecommandWebtoonArea = styled.div`
  overflow: hidden;
  scroll: yes;
  margin-top: 20px;
  height : 100%;
  width: 95%;
`;

const Subtitle = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  letter-spacing: "2px";
  border-bottom: 1px solid white;
  padding: 10px;
  width: 60%;
`;

const DivTitle = styled.div`
  text-align: left;
  margin-top: 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const DivWebtoon = styled.div`
    display : flex;
    flex-direction : row;
    width:'100%';
    align-items:center;
    justify-content : center;
    margin-left : 20px;
`
const StyleImage = styled.img`
  margin-bottom: 10px; 
  margin-top:20px;
  height:250px; 
  width:150px; 
  border-radius : 10px
`
const AuthorText = styled.div`
  margin-top : 10px;
  margin-bottom : 10px;
  color : ${({ theme }) => theme.text};
`
function MainPage() {
  // 사용자 이름 불러오기
  const [loggedUserName, setLoggedUserName] = useState('');
  const [recommendGenre, setRecommendGenre] = useState([])
  const [recommendDraw, setRecommendDraw] = useState([]);
  const [recommendOutline, setRecommendOutline] = useState([]);
  const [recommendAuthor, setRecommendAuthor] = useState([]);
  // 로컬 스토리지에 사용자 이름 저장
  const [isAdult, setIsAdult] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNameData = async () => {

      const email = localStorage.getItem('loggedUserEmail')

      const rdata = {
        email: email,
      };

      axios
        .post("toonder/name", rdata)
        .then((loggedUserData) => {
          const userName = loggedUserData.data.mem_name;
          setLoggedUserName(userName);

          localStorage.setItem("loggedUserName", userName);
          console.log(userName);
        })
        .catch((error) => {
          console.log(error)
          setLoggedUserName('')});

    };
    
    
    const fetchUnloggedList = () => {  
      axios
        .get('toonder/webtoon/recommend/outline?19filter=true')
        .then(res => setRecommendGenre(res.data))
      
        axios
        .get('toonder/webtoon/recommend/outline?19filter=true')
        .then(res => setRecommendDraw(res.data))
  
        axios
        .get('toonder/webtoon/recommend/outline?19filter=true')
        .then(res => setRecommendOutline(res.data))
        
        axios
        .get('toonder/webtoon/recommend/outline?19filter=true')
        .then(res => setRecommendAuthor(res.data))
    };

    const fetchLoggedList = () => {   
      const email = localStorage.getItem('loggedUserEmail')
      const rtData = {
        email : email
      }
      axios
        .post('toonder/recommand', rtData)
        .then(res => setRecommendGenre(res.data))
        .catch(error => console.log(error))
      
        axios
        .get('toonder/webtoon/recommend/outline?19filter='+isAdult)
        .then(res => setRecommendDraw(res.data))
  
        axios
        .get('toonder/webtoon/recommend/draw?19filter='+isAdult)
        .then(res => setRecommendOutline(res.data))
        
        axios
        .get('toonder/webtoon/recommend/outline?19filter='+isAdult)
        .then(res => setRecommendAuthor(res.data))
    };

    fetchNameData();

    if (localStorage.getItem('loggedUserEmail') ){
      fetchLoggedList()
    }
    else {
      console.log(isAdult)
      console.log(!localStorage.getItem('adult'))
      setIsAdult(localStorage.getItem('adult'))
      fetchUnloggedList()
    }
  }, []);

  return (
    <>
      <Header title="TOONDER" subtitle="당신이 찾는 모든 웹툰에 대해" />

      <Subtitle>오늘 {loggedUserName === '' ? '???' : loggedUserName} 님이 볼만한 웹툰!</Subtitle>

      <RecommandWebtoonArea>
        <DivTitle>좋아하시는 장르가 비슷해요.</DivTitle>
        <DivWebtoon>
          {recommendGenre.map(item => (
            <div style={{marginRight:"5%"}} onClick ={ () => navigate("/webtooninfo" ,{state :{mastrId : item.mastrId}})}>  
          
              <StyleImage src={item.imageDownloadUrl} alt="image error"/>
              <AuthorText>{item.title.length > 9 ? item.title.substring(0,10) + '...' : item.title}</AuthorText>
              <AuthorText>{item.pictrWritrNm}</AuthorText>
            </div>

          ))}
        </DivWebtoon>
        <DivTitle>좋아하시는 그림체가 비슷해요.</DivTitle>
        <DivWebtoon>
          {recommendDraw.map(item => (
            <div style={{marginRight:"5%"}} onClick ={ () => navigate("/webtooninfo", {state :{mastrId : item.mastrId}})}>  
              <StyleImage src={item.imageDownloadUrl} alt="image error"/>
              <AuthorText>{item.title.length > 9 ? item.title.substring(0,10) + '...' : item.title}</AuthorText>
              <AuthorText>{item.pictrWritrNm}</AuthorText>
            </div>

          ))}
        </DivWebtoon>
        <DivTitle>좋아하시는 줄거리가 비슷합니다.</DivTitle>
        <DivWebtoon>
          {recommendOutline.map(item => (
            <div style={{marginRight:"5%"}} onClick ={ () => navigate("/webtooninfo", {state :{mastrId : item.mastrId}})}>  
              <StyleImage src={item.imageDownloadUrl} alt="image error"/>
              <AuthorText>{item.title.length > 9 ? item.title.substring(0,10) + '...' : item.title}</AuthorText>
              <AuthorText>{item.pictrWritrNm}</AuthorText>
            </div>

          ))}
        </DivWebtoon>
        <DivTitle>좋아하시는 작가님의 다른 작품이에요!</DivTitle>
        <DivWebtoon>
          {recommendAuthor.map(item => (
            <div style={{marginRight:"5%"}} onClick ={ () => navigate("/webtooninfo", {state :{mastrId : item.mastrId}})}>  
              <StyleImage src={item.imageDownloadUrl} alt="image error"/>
              <AuthorText>{item.title.length > 9 ? item.title.substring(0,10) + '...' : item.title}</AuthorText>
              <AuthorText>{item.pictrWritrNm}</AuthorText>
            </div>

          ))}
        </DivWebtoon>
      </RecommandWebtoonArea>
    </>
  );
}

export default MainPage;
