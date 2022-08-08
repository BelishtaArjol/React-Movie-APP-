import {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MovieInfoComponent from "./components/MovieInfoComponent";

const App = () => {
  const [selectedMovie, onMovieSelect] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-movie-app" element={<Main onMovieSelect={onMovieSelect}/>} />
        <Route path="info/:id"  element={<MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
