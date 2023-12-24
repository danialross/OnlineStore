import styled from "styled-components";
import { Form } from "react-bootstrap";

const ErrorText = styled(Form.Text)`
  color: red;
`;

function ErrorMessage({ message }) {
  if (message !== "") {
    return (
      <>
        <p></p>
        <ErrorText>{message}</ErrorText>
      </>
    );
  }
}

export default ErrorMessage;
