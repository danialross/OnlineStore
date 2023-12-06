import Featured from "../components/Featured";
import styled from "styled-components";

function HomePage() {
  const MainDiv = styled.div`
    background-color: #edcac4;
    height: 100vh;
    width: 100wv;
  `;
  return (
    <MainDiv>
      <Featured />
    </MainDiv>
  );
}

export default HomePage;
