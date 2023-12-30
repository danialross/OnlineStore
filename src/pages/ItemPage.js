import styled from "styled-components";
import SingleItem from "../components/SingleItem";

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #edcac4;
  margin-top: 5.5rem;
`;

function ItemPage() {
  return (
    <OuterDiv>
      <SingleItem />
    </OuterDiv>
  );
}

export default ItemPage;
