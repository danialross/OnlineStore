import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Loader from "./Loader";

const LoaderDiv = styled.div`
  margin-top: 5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5.5rem;
  padding-bottom: 2rem;
`;

const StyledTitle = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: white;
  outline: 2px solid white;
  border-radius: 10px;
  background-color: #89abe3;
  padding: 0.5rem;
  width: 15rem;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  margin-bottom: 8rem;
  max-height: 18rem;
`;

const StyledCarousel = styled(Carousel)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #89abe3;
  width: 80%;
  height: 30rem;
  border-radius: 50px;
  outline: 2px solid white;
`;

const Frame = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 26rem;
`;

const Caption = styled(Carousel.Caption)`
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 1.5vw;
  max-width: 100%;
  height: 5rem;
  overflow: hidden;
`;

function Featured() {
  const server = "http://localhost:3000/items";
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(server)
      .then((res) => {
        const picked3 = [];
        const data = res.data.items;
        data.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 3; i++) {
          picked3.push(data.pop());
        }
        setFeatured(picked3);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Axios error:", err);
      });
  }, []);

  return isLoading ? (
    <LoaderDiv>
      <Loader />
    </LoaderDiv>
  ) : (
    <StyledDiv>
      <StyledTitle>Featured</StyledTitle>
      <StyledCarousel>
        {featured.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <Frame to={"/" + item.id}>
                <StyledImage src={item.image} fluid thumbnail />
                <Caption>{item.title}</Caption>
              </Frame>
            </Carousel.Item>
          );
        })}
      </StyledCarousel>
    </StyledDiv>
  );
}

export default Featured;
