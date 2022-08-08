import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 9.2%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const Main = (props) => {

  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [searchParam] = useState(["title"]);
  const [filterParam, setFilterParam] = useState(["All"]);


  useEffect( async () => {
    Axios.get(
      `https://imdb-api.com/API/AdvancedSearch/k_q6gyyd3m?groups=top_250&count=250`,      
    ).then((response) => updateMovieList(response.data.results));
  }, []);

// console.log(movieList);

  const search = (movieList) => {
    return movieList.filter((item) => {
        if (item.genres.indexOf(filterParam) !==-1) {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) > -1
                );
            });
        } else if (filterParam == "All") {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) > -1
                );
            });
        }
    });
}


  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.svg" />
          React Movie App
        </AppName>
          <Filter>
              <select
                  onChange={(e) => {
                    setFilterParam(e.target.value);
                  }}
              >
                  <option value="All">All</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Crime">Crime</option>
                  <option value="Fantasy">Fantasy</option>
              </select>
              <span></span>
          </Filter>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
        </SearchBox>
      </Header>
      <MovieListContainer>
        {
          search(movieList).map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={props.onMovieSelect}
            />
          ))
        }
      </MovieListContainer>
    </Container>
  );
}

export default Main;
