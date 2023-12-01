import { useEffect, useState } from "react"
import Header from "../background/Header"
import axios from "axios"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const RecommandWebtoonArea = styled.div`
  overflow: hidden;
  scroll: yes;
  margin-top: 20px;
  height : 100%;
  width: 95%;
`;

const DivWebtoon = styled.div`
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
    width:'100%';
    align-items:center;
    justify-content : center;
    margin-left : 20px;
`

const StyleImage = styled.img`
  margin-bottom: 10px; 
  margin-top:20px;
  height:250px; 
  width:139px; 
  border-radius : 10px
`
const AuthorText = styled.div`
  margin-top : 10px;
  margin-bottom : 10px;
  color : ${({ theme }) => theme.text};
  `

const AuthorText2 = styled.div`
  margin-top : 10px;
  margin-bottom : 10px;
  font-size : 10px;
  color : ${({ theme }) => theme.text};
`

function WebtoonList(){
    const navigate = useNavigate();
    const [webtoonList, setWebtoonList] = useState([])
    const [countPage, setCountPage] = useState(1)


    
    function onScroll() {
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom =
          Math.ceil(window.scrollY + windowHeight) >= documentHeight;

    
        if (scrolledToBottom) {
            console.log('!')
          setCountPage(countPage + 1);
        }
      }
    
      useEffect(() => {
        //console.log(showNavigationToScrollTop)
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };

        
      });

    useEffect(() => {
        axios.get('toonder/webtoon?type=mastrId&page=' + countPage).then((res) => {
            if (webtoonList.length === 0) {
                console.log(res.data)
                setWebtoonList(res.data)
            } else {
                console.log(countPage)
                setWebtoonList(webtoonList.concat(res.data));
            }
          });
    
    },[countPage])

    return (
        <>
            <Header title="웹툰 목록" />
            <RecommandWebtoonArea>
                <DivWebtoon>
                {webtoonList.map(item => (
                    <div style={{marginRight:"5%"}} onClick ={ () => navigate("/webtooninfo")}>  
                
                    <StyleImage src={item.imageDownloadUrl} alt="image error"/>
                    <AuthorText>{item.title.length > 8 ? item.title.substring(0,10) + '...' : item.title}</AuthorText>
                    <AuthorText2>{item.pictrWritrNm}</AuthorText2>
                    </div>

                ))}
                </DivWebtoon>
            </RecommandWebtoonArea>
        </>
    )
}

export default WebtoonList