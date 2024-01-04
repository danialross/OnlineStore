import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

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
  margin-left: 1rem;
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

const RemoveButton = styled(Button)`
  padding: 0rem;
`;

function CartItem({
  id,
  image,
  title,
  price,
  quantity,
  username,
  updateParent,
}) {
  const handleUpdateCart = async (count) => {
    const url = "http://localhost:3000/add-to-cart";
    const body = { username: username, itemId: id, quantity: count };
    axios
      .put(url, body)
      .then((res) => {
        console.log(res.data);
        updateParent();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
            Quantity :
            <Decrease
              onClick={
                quantity - 1 > 0 ? () => handleUpdateCart(quantity - 1) : null
              }
            >
              -
            </Decrease>
            <Counter disabled>{quantity}</Counter>
            <Increase onClick={() => handleUpdateCart(quantity + 1)}>
              +
            </Increase>
          </Quantity>

          <RemoveButton variant="link" onClick={() => handleUpdateCart(0)}>
            Remove
          </RemoveButton>
        </Col>
      </Row>
    </StyledDiv>
  );
}

export default CartItem;
