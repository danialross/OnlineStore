import Catalog from "../components/Catalog";
import Featured from "../components/Featured";
import styled from "styled-components";

function HomePage() {
  const MainDiv = styled.div`
    background-color: #edcac4;
    height: auto;
    width: 100wv;
  `;
  return (
    <MainDiv>
      <Featured />
      <Catalog />
    </MainDiv>
  );
}

export default HomePage;
