import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect( async () => {
    Axios.get(
      `https://imdb-api.com/API/AdvancedSearch/k_q6gyyd3m?groups=top_250&count=250`,      
    ).then((response) => setMovieInfo(response.data.results));
  }, [selectedMovie]);

  const currentMovie= movieInfo?.find((movie)=> movie.id === id)

  return (
    <Container>
        {currentMovie &&
        <> 
          <CoverImage src={currentMovie?.image} alt={currentMovie?.title} />
          <InfoColumn>
            <MovieName>
            <span>{currentMovie?.title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{currentMovie?.imDbRating}</span>
            </MovieInfo>
            <MovieInfo>
              IMDB Rating Votes: <span>{currentMovie?.imDbRatingVotes}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{currentMovie?.description}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{currentMovie?.genres}</span>
            </MovieInfo>
            <MovieInfo>
              Main Actors: <span>{currentMovie?.stars}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{currentMovie?.plot}</span>
            </MovieInfo>
            <MovieInfo>
            <button className="btn btn-link" onClick={() => {navigate("/react-movie-app");}}>
              Return to Homepage
            </button>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
          </>}
    </Container>  
  );
};
export default MovieInfoComponent;
