import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Loader from "./Loader";
import StyledButton from "./StyledButton";
import addToCartContext from "../context/AddToCartContext";
import ModalWithMessage from "./ModalWithMessage";

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  width: 10rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 2px solid white;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background-color: #89abe3;
  color: white;
  text-align: center;
`;

const ItemsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  background-color: #89abe3;
  outline: 2px solid white;
  border-radius: 5px;
  padding: 1rem;
`;

const Image = styled.img`
  max-width: 15rem;
  max-height: 12rem;
  object-fit: contain;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  width: 20rem;
  height: 25rem;
  outline: 2px solid white;
  border-radius: 5px;
  margin: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
`;
const ColoredText = styled.p`
  color: #89abe3;
`;

function Category({ filterBy }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useContext(addToCartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleButtonClick = async (id, title) => {
    const result = await handleAddToCart(id);
    if (result === "success") {
      setShowMessage(true);
      setMessage(title);
    }
  };

  let url = "";
  let title = "";
  if (filterBy === "him") {
    url = "https://fakestoreapi.com/products/category/men's clothing";
    title = "For Him";
  } else if (filterBy === "her") {
    url = "https://fakestoreapi.com/products/category/women's clothing";
    title = "For Her";
  }

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setIsLoading(true);
      setItems([]);
    };
  }, [url]);

  return (
    <OuterDiv>
      <HeaderDiv>
        <Title>{title}</Title>
      </HeaderDiv>
      {isLoading ? (
        <Loader />
      ) : (
        <ItemsDiv>
          {items.map((item) => {
            return (
              <Card key={item.id}>
                <StyledLink to={"/items/" + item.id}>
                  <Image src={item.image} />
                  <ColoredText>{item.title}</ColoredText>
                  <ColoredText>${item.price.toFixed(2)}</ColoredText>
                </StyledLink>
                <StyledButton
                  variant={"secondary"}
                  text={"Add To Cart"}
                  onClick={() => handleButtonClick(item.id, item.title)}
                />
              </Card>
            );
          })}
        </ItemsDiv>
      )}
      <ModalWithMessage
        show={showMessage}
        message={message + " has been added"}
        hide={() => {
          setShowMessage(false);
        }}
        onExited={() => setMessage("")}
      />
    </OuterDiv>
  );
}

export default Category;
