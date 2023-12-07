import StyledButton from "./StyledButton";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const StyledDiv = styled.div`
  display: flex;

  items-align: center;
  justify-content: center;
`;

const Bar = styled.div`
  width: 80%;
  outline: 2px solid white;
  display: flex;
  items-align: center;
  justify-content: left;
  background-color: #89abe3;
  padding: 1rem;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  margin-right: 1rem;
  border-radius: 5px;
  width: 30rem;
  color: #89abe3;
`;

function Catalog() {
  return (
    <StyledDiv>
      <Bar>
        <SearchInput placeholder="Search For Item"></SearchInput>
        <StyledButton variant="secondary" text="Search" />
        {/* fetch items and fill */}
      </Bar>
    </StyledDiv>
  );
}

export default Catalog;
