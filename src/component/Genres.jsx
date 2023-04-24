import Chip from "@mui/material/Chip";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenre,
  SetselectedGenre,
  genres,
  SetGenre,
  setPage,
  type,
  page,
}) => {
  const handleAdd = (genre) => {
    SetselectedGenre([...selectedGenre, genre]);
    SetGenre(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    SetselectedGenre(
      selectedGenre.filter((selected) => selected.id !== genre.id)
    );
    SetGenre([...genres, genre]);
    setPage(1)
  };

  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    SetGenre(data.genres);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchGenre();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenre &&
        selectedGenre.map((genre) => (
          <Chip
            label={genre.name}
            color="primary"
            style={{ margin: "3px" }}
            variant="outlined"
            clickable
            key={genre.id}
            onDelete={()=>handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            color="error"
            style={{ margin: "3px" }}
            variant="outlined"
            clickable
            key={genre.id}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
