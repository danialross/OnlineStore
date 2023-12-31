import styled from "styled-components";
import Catalog from "../components/Catalog";
import Featured from "../components/Featured";

const MainDiv = styled.div`
  background-color: #edcac4;
  height: auto;
  width: 100wv;
`;

function HomePage() {
  return (
    <MainDiv>
      <Featured />
      <Catalog />
    </MainDiv>
  );
}

export default HomePage;
