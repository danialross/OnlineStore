import styled from "styled-components";
import Button from "react-bootstrap/Button";
function StyledButton(prop) {
  const StyledButton = styled(Button)`
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

  return <StyledButton variant={prop.variant}>{prop.text}</StyledButton>;
}

export default StyledButton;
