import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const LoadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  width: 100%;
`;

const CustomSpinner = styled(Spinner)`
  height: 15rem;
  width: 15rem;
  padding: 2rem;
`;

function Loader({ variant, ...otherProps }) {
  return (
    <LoadDiv>
      <CustomSpinner
        animation="border"
        role="status"
        size="lg"
        {...otherProps}
        variant={variant ? variant : "light"}
      >
        <span className="visually-hidden">Loading...</span>
      </CustomSpinner>
    </LoadDiv>
  );
}

export default Loader;
