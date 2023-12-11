import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const StyledCarousel = styled(Carousel)`
  padding-top: 2rem;
  background-color: #89abe3;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 30rem;
  border-radius: 50px;
  outline: 2px solid white;
`;

const Caption = styled(Carousel.Caption)`
  font-size: 1.5rem;
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 10px;
`;

const Item = styled(Carousel.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ResponsiveImage = styled(Image)`
  max-width: 27rem;
  max-height: 17rem;
  margin-bottom: 7rem;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
    <Loader />
  ) : (
    <StyledDiv>
      <StyledTitle>Featured</StyledTitle>
      <StyledCarousel>
        {featured.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <NavLink to={"/" + item.id}>
                <Frame>
                  <ResponsiveImage src={item.image} fluid thumbnail />
                </Frame>

                <Caption>{item.title}</Caption>
              </NavLink>
            </Carousel.Item>
          );
        })}
      </StyledCarousel>
    </StyledDiv>
  );
}

export default Featured;
