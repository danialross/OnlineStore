import styled from "styled-components";
import Button from "react-bootstrap/Button";

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

function StyledButton(prop) {
  return (
    <CustomButton variant={prop.variant} onClick={prop.onClick}>
      {prop.text}
    </CustomButton>
  );
}

export default StyledButton;
