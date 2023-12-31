import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import Loader from "./Loader";
import AddToCartContext from "../context/AddToCartContext";
import ModalWithMessage from "./ModalWithMessage";

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 60%;
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  overflow: hidden;
  font-size: 2rem;
  text-align: center;
`;

const Background = styled.div`
  width: 80%;
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Picture = styled(Image)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  max-width: 30rem;
  max-height: 30rem;
`;

const Text = styled.div`
  width: 80%;
  border-radius: 5px;
  background-color: white;
  padding: 2rem;
  color: #89abe3;
  margin-bottom: 2rem;
  text-align: center;
`;

const BottomGap = styled.div`
  margin-bottom: 2rem;
`;

function SingleItem() {
  const itemId = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://localhost:3000/items/" + itemId.id;
  const { handleAddToCart } = useContext(AddToCartContext);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setItem(res.data.item);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [url]);

  const handleButtonClick = async (id, title) => {
    const result = await handleAddToCart(id);
    if (result === "success") {
      setShowMessage(true);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CenterDiv>
      <Header>{item.title}</Header>
      <Background>
        <Picture src={item.image} alt={item.title} thumbnail />
        <Text>
          <BottomGap>${item.price.toFixed(2)}</BottomGap>
          <BottomGap>{item.description}</BottomGap>
          <StyledButton
            onClick={() => handleButtonClick(item.id, item.title)}
            variant={"secondary"}
            text={"Add To Cart"}
          />
        </Text>
      </Background>
      <ModalWithMessage
        show={showMessage}
        message={item.title + " has been added"}
        hide={() => {
          setShowMessage(false);
        }}
      />
    </CenterDiv>
  );
}

export default SingleItem;
