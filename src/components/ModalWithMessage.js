import { Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import StyledButton from "./StyledButton";

const SuccessText = styled(Form.Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: green;
  width: 100%;
  border-radius: 10px;
`;

const StyledFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: space-between;
`;

function ModalWithMessage({ show, hide, message, secondButton }) {
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Body>
        <SuccessText>{message}</SuccessText>
      </Modal.Body>
      <StyledFooter>
        {!secondButton ? (
          <>
            <p />
            <StyledButton variant="secondary" onClick={hide} text="Close" />
          </>
        ) : (
          <>
            <StyledButton variant="secondary" onClick={hide} text="Close" />
            {secondButton}
          </>
        )}
      </StyledFooter>
    </Modal>
  );
}

export default ModalWithMessage;
