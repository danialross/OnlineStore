import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Caption = styled(Carousel.Caption)`
  font-size: 1.5rem;
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 10px;
`;
const StyledCarousel = styled(Carousel)`\

padding-top:2rem;

  background-color: #89abe3;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 30rem;
  border-radius: 50px;
  outline: 2px solid white;

`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;

const StyledTitle = styled.h1`
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

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #edcac4;
`;

const ResponsiveImage = styled(Image)`
  max-width: 25rem;
  max-height: 15rem;
`;

const Frame = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 25rem;
  width: 100vw;
  padding-top: 1rem;
  padding-right: 24.5rem;
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
        console.log(picked3);
      })
      .catch((err) => {
        console.error("Axios error:", err);
      });
  }, []);

  return isLoading ? (
    <Loader>
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Loader>
  ) : (
    <StyledDiv>
      <StyledTitle>Featured</StyledTitle>
      <StyledCarousel>
        {featured.map((item) => {
          return (
            <Carousel.Item>
              <Frame>
                <NavLink to={"/" + item.id}>
                  <ResponsiveImage src={item.image} fluid thumbnail />
                </NavLink>
              </Frame>
              <Caption>{item.title}</Caption>
            </Carousel.Item>
          );
        })}
      </StyledCarousel>
    </StyledDiv>
  );
}

export default Featured;
