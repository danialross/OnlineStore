import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const LoadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Loader() {
  <LoadDiv>
    <Spinner animation="border" role="status" variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </LoadDiv>;
}

export default Loader;
