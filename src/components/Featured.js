import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Caption = styled(Carousel.Caption)`
  font-size: 1.5rem;
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

const StyledDiv = styled.div`
  background-color: #edcac4;
`;
const Frame = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 25rem;
  width: 100vw;
  padding-top: 3rem;
`;

const PictureArea = styled.div`
  outline: 4px solid #89abe3; /* Set the outline width and color */
  border-radius: 10px;
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

  if (isLoading) {
    return (
      <Loader>
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Loader>
    );
  }

  return (
    <StyledDiv>
      <Carousel>
        {featured.map((item) => {
          return (
            <Carousel.Item>
              <Frame>
                <PictureArea>
                  <NavLink to={"/" + item.id}>
                    <ResponsiveImage src={item.image} fluid thumbnail />
                  </NavLink>
                </PictureArea>
              </Frame>
              <Caption>{item.title}</Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </StyledDiv>
  );
}

export default Featured;
