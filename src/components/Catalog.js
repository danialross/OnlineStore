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
  margin-top: 1rem;
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
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const ItemsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

const CustomCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 20rem;
  height: 30rem;

  margin-bottom: 2rem;
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

const StyledForm = styled(Form)`
  margin-right: 1rem;
`;

const SearchBar = styled(Form.Control)`
  color: #89abe3;
`;

const StyledImage = styled(Card.Img)`
  object-fit: contain;
  max-height: 20rem;
  max-width: 20rem;
  padding: 2rem;
  margin-bottom: 1rem;
`;

const Frame = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
`;
const Body = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  max-height: 10rem;
`;

const Title = styled(Card.Title)`
  text-align: center;
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
                  <CustomCard>
                    <Frame>
                      <NavLink to={"/" + item.id}>
                        <StyledImage variant="top" src={item.image} />
                      </NavLink>
                    </Frame>

                    <Body>
                      <Title>{item.title}</Title>
                      <StyledDiv>
                        <StyledButton variant="secondary" text="Add to cart" />
                      </StyledDiv>
                    </Body>
                  </CustomCard>
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
