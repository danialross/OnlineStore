import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import StyledButton from "./StyledButton";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { Card, Form, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUndo,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Bar = styled.div`
  width: 80%;
  outline: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #89abe3;
  padding: 1rem;
  border-radius: 10px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 103%;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 2rem;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 10px;
  padding: 1.5rem;
  outline: 2px solid white;
`;

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-right: 1rem;
`;

const SearchBar = styled(Form.Control)`
  color: #89abe3;
  width: 100%;

  &:focus {
    color: #89abe3;
  }

  &::placeholder {
    color: #89abe3;
  }
`;

const Clear = styled(CloseButton)`
  margin-left: -2rem;
`;

const ItemsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 20rem;
  height: 30rem;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const StyledImage = styled(Card.Img)`
  object-fit: contain;
  max-height: 18rem;
  padding: 2rem;
`;

const Spacer = styled.div`
  margin-right: 1rem;
`;

const Body = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Card.Title)`
  text-align: center;
  color: #89abe3;
`;

const Text = styled(Card.Text)`
  color: #89abe3;
`;

const NoResultCard = styled(Card)`
  width: 20rem;
  height: 15rem;
  padding: 2rem;
`;

const NoResultBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #89abe3;
`;

function Catalog() {
  const server = "http://localhost:3000/items";
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = (e) => {
    if (query !== "") {
      setQuery("");
    }
  };

  const handleReset = () => {
    if (query !== "") {
      setQuery("");
      const newFiltered = items.filter((item) =>
        item.title.toLowerCase().includes("")
      );
      setLastQuery("");
      setFiltered(newFiltered);
    }
  };

  const handleSearch = () => {
    if (lastQuery !== query) {
      console.log("filtered");
      const newFiltered = items.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
      setLastQuery(query);
      setFiltered(newFiltered);
    } else {
      console.log("didnt filter");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    axios
      .get(server)
      .then((res) => {
        setItems(res.data.items);
        setFiltered(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledDiv>
      <Bar>
        <Col>
          <Row>
            <SearchDiv>
              <StyledForm onSubmit={handleSubmit}>
                <SearchBar
                  placeholder="Search"
                  onChange={handleChange}
                  value={query}
                />
                <Clear onClick={handleClear} />
              </StyledForm>
              <StyledButton
                variant="secondary"
                onClick={handleSearch}
                icon={faSearch}
              />
              <Spacer />
              <StyledButton
                variant="secondary"
                onClick={handleReset}
                icon={faUndo}
              />
            </SearchDiv>
          </Row>
          {isLoading ? (
            <Loader />
          ) : (
            <ItemsDiv>
              {filtered.length !== 0 ? (
                filtered.map((item) => {
                  return (
                    <CustomCard key={item.id}>
                      <StyledNavLink to={"/items/" + item.id}>
                        <StyledImage variant="top" src={item.image} />
                        <Body>
                          <Title>{item.title}</Title>
                          <Text>${item.price.toFixed(2)}</Text>
                        </Body>
                      </StyledNavLink>
                      <StyledButton variant="secondary" text="ADD TO CART" />
                    </CustomCard>
                  );
                })
              ) : (
                <NoResultCard key={0}>
                  <NoResultBody>
                    <Title>No Items Found</Title>
                    <StyledIcon icon={faCircleQuestion} size="5x" />
                    <Text>No Matches with "{query}"</Text>
                  </NoResultBody>
                </NoResultCard>
              )}
            </ItemsDiv>
          )}
        </Col>
      </Bar>
    </StyledDiv>
  );
}

export default Catalog;
