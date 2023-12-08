import StyledButton from "./StyledButton";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import axios from "axios";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomButton = styled(StyledButton)`
  border-color: black;
`;

const LoadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchDiv = styled.div`
  display: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;
const ItemsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CardDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 25rem;
  width: 15rem;
`;

const Bar = styled.div`
  width: 80%;
  outline: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #89abe3;
  padding: 1rem;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  margin-right: 1rem;
  border-radius: 5px;
  width: 30rem;
  color: #89abe3;
`;

const Image = styled(Card.Img)`
  padding: 1rem;
`;

function Catalog() {
  const server = "http://localhost:3000/items";
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(server)
      .then((res) => {
        console.log(res.data.items);
        setItems(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledDiv>
      <Bar>
        <Row>
          <SearchDiv>
            <SearchInput placeholder="Search For Item"></SearchInput>
            <StyledButton variant="secondary" text="Search" />
          </SearchDiv>
          {isLoading ? (
            <LoadDiv>
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </LoadDiv>
          ) : (
            <ItemsDiv>
              {items.map((item) => {
                return (
                  <CardDiv>
                    <Card>
                      <NavLink to={"/" + item.id}>
                        <Image variant="top" src={item.image} />
                      </NavLink>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <StyledDiv>
                          <CustomButton
                            variant="secondary"
                            text="Add to cart"
                          ></CustomButton>
                        </StyledDiv>
                      </Card.Body>
                    </Card>
                  </CardDiv>
                );
              })}
            </ItemsDiv>
          )}
        </Row>
      </Bar>
    </StyledDiv>
  );
}

export default Catalog;
