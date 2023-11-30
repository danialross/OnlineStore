import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Item = styled.div`
  margin-top: 3rem;
  width: 1800px;
  height: 400px;
  background-color: #89abe3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-radius: 50px;
`;

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #edcac4;
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function HomePage() {
  return (
    <StyledDiv>
      <Carousel>
        <Carousel.Item>
          <Frame>
            <Item>First</Item>
          </Frame>
          <Carousel.Caption>
            <h3>First Slide</h3>
            <p>This is the caption for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Frame>
            <Item>Second</Item>{" "}
          </Frame>

          <Carousel.Caption>
            <h3>Second Slide</h3>
            <p>This is the caption for the second slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Frame>
            <Item>Third</Item>{" "}
          </Frame>

          <Carousel.Caption>
            <h3>Third Slide</h3>
            <p>This is the caption for the third slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </StyledDiv>
  );
}

export default HomePage;
