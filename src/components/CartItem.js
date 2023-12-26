import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import StyledButton from "./StyledButton";

const Frame = styled.img`
  padding: 2rem;
  width: 15rem;
`;
const StyledDiv = styled.div`
  color: #89abe3;

  margin-bottom: 1rem;
  border-top: 2px solid #ccc;
`;

const Title = styled.div`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Price = styled.div`
  margin-bottom: 2rem;
`;

const Quantity = styled.div`
  margin-bottom: 2rem;
`;

const Decrease = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const Counter = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const Increase = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

function CartItem({ image, title, price, quantity }) {
  return (
    <StyledDiv>
      <Row>
        <Col>
          <Frame src={image}></Frame>
        </Col>
        <Col>
          <Title>{title}</Title>
          <Price>${price}</Price>

          <Quantity>
            Quantity : <Decrease>-</Decrease>
            <Counter disabled>{quantity}</Counter>
            <Increase>+</Increase>
          </Quantity>
        </Col>
      </Row>
    </StyledDiv>
  );
}

export default CartItem;
