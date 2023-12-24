import { Form } from "react-bootstrap";
import styled from "styled-components";

const ErrorControl = styled(Form.Control)`
  border-color: red;
`;

const ErrorText = styled(Form.Text)`
  color: red;
`;

function UserInput({ isInputValid, input, ...otherProps }) {
  if (isInputValid) {
    return <Form.Control {...otherProps} />;
  } else {
    return (
      <>
        <ErrorControl {...otherProps} />
        <ErrorText>{input} is empty</ErrorText>
      </>
    );
  }
}

export default UserInput;
