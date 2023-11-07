import React from "react";
import { Link } from "react-router-dom";
import { Head } from "../../styles/background/Head";
import styled from "styled-components";

const Title = styled.div`
  font-size: 24px;
  color: #efefef;
  letter-spacing: 2px;
  margin: 10px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #efefef;
  letter-spacing: "2px";
`;

function Header(props) {
  return (
    <Head>
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"
          width="80px"
          height="auto"
        />
      </Link>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </Head>
  );
}

export default Header;
