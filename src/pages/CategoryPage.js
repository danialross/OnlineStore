import styled from "styled-components";
import Category from "../components/Category";

const StyledDiv = styled.div`
  margin-top: 5.5rem;
  padding-bottom: 1rem;
  background-color: #edcac4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

function CategoryPage({ filterBy }) {
  return (
    <StyledDiv>
      <Category filterBy={filterBy} />
    </StyledDiv>
  );
}

export default CategoryPage;
