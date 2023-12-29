import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "./Loader";
import StyledButton from "./StyledButton";

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

const ColoredText = styled.p`
  color: #89abe3;
`;

function Category({ filterBy }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log("triggered");
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
  }, []);

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
                <Image src={item.image} />
                <ColoredText>{item.title}</ColoredText>

                <ColoredText>${item.price.toFixed(2)}</ColoredText>
                <StyledButton variant={"secondary"} text={"Add to cart"} />
              </Card>
            );
          })}
        </ItemsDiv>
      )}
    </OuterDiv>
  );
}

export default Category;
