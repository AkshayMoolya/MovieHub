import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import Genres from "../../Genres";
import useGenres from "../../hooks/useGenres";

const Movies = () => {
  const [page, setpage] = useState(1);
  const [Content, setContent] = useState([]);
  const [numOfpages, setnumOfpages] = useState();
  const [SelectedGenre, SetselectedGenre] = useState([]);
  const [Genre, SetGenre] = useState([]);
  const genreforURL = useGenres(SelectedGenre);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setnumOfpages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <div className="pageTitle">Movies</div>
      <Genres
        type="movie"
        selectedGenre={SelectedGenre}
        SetselectedGenre={SetselectedGenre}
        genres={Genre}
        SetGenre={SetGenre}
        setPage={setnumOfpages}
        page={page}
      />
      <div className="Trending">
        {Content &&
          Content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfpages > 1 && (
        <CustomPagination setPage={setpage} numOfPages={numOfpages} />
      )}
    </div>
  );
};

export default Movies;
