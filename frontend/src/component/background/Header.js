// Header.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin: 10px;
`;

const Title = styled.div`
font-family: "NIXGONB-Vb-B";
  font-size: 24px;
  color: ${({ theme }) => theme.header};
  letter-spacing: 2px;
  margin: 5px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.header};
  letter-spacing: "2px";
`;

function Header(props) {
  return (
    
    <HeaderContainer>
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"
          width="60px"
          height="auto"
        />
      </Link>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </HeaderContainer>
  );
}

export default Header;
