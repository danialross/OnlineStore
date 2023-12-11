import StyledButton from "./StyledButton";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Loader from "./Loader";
import Form from "react-bootstrap/Form";

const StyledDiv = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 5rem;
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

const Image = styled(Card.Img)`
  padding: 1rem;
`;

const Label = styled(Form.Label)`
  outline: 2px solid white;
  border-radius: 10px;
  padding: 1rem;
  color: white;
`;

const StyledForm = styled(Form)`
  margin-right: 1rem;
`;

const SearchBar = styled(Form.Control)`
  color: #89abe3;
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
            <StyledForm>
              <SearchBar placeholder="Search For Item" />
            </StyledForm>
            <StyledButton variant="secondary" text="Search" />
          </SearchDiv>
          {isLoading ? (
            <Loader />
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
                          <StyledButton
                            variant="secondary"
                            text="Add to cart"
                          ></StyledButton>
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
