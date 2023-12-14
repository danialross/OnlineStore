import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = styled(Button)`
  background-color: white;
  color: #89abe3;
  border-color: #89abe3;

  &:hover {
    background-color: #edcac4;
    border-color: #edcac4;
  }

  &:active {
    background-color: #edcac4;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Row = styled.div`
  display: flex;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

function StyledButton({ variant, onClick, icon, text }) {
  return (
    <CustomButton variant={variant} onClick={onClick}>
      <Row>
        {/* has text and icon */}
        {text && icon && <StyledDiv>{text}</StyledDiv>}

        {/* has text but no icon */}
        {text && !icon && text}

        {/* has icon */}
        {icon && (
          <IconDiv>
            <FontAwesomeIcon icon={icon} />
          </IconDiv>
        )}
      </Row>
    </CustomButton>
  );
}

export default StyledButton;
