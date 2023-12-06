import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const Caption = styled(Carousel.Caption)`
  margin-top: 4rem;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #edcac4;
`;

const ResponsiveImage = styled(Image)`
  width: 20rem;
  object-fit: contain;
`;

const StyledDiv = styled.div`
  width: 50rem;
  height: 50rem;
  background-color: #edcac4;
`;
const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rem;
  height: auto;
`;

const PictureArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const CaptionArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 20%;
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
                  <ResponsiveImage
                    src={item.image}
                    alt={item.title}
                    fluid
                    rounded
                  />
                </PictureArea>
                <CaptionArea>
                  <Caption>{item.title}</Caption>
                </CaptionArea>
              </Frame>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </StyledDiv>
  );
}

export default Featured;
