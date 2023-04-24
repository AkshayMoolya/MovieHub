import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

const Search = () => {
  const [Type, setType] = useState(0);
  const [page, setpage] = useState(1);
  const [SearchText, setSearchText] = useState("");
  const [Content, setContent] = useState();
  const [numOfpages, setnumOfpages] = useState();

  const darktheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#e57373",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${Type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${SearchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setnumOfpages(data.total_pages);
    } catch {}
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [page, Type]);

  return (
    <div>
      <ThemeProvider theme={darktheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            color="error"
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" sx={{ marginLeft: "10px" }} onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <div>
          <Tabs
            value={Type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setpage(1);
            }}
            
          >
            <Tab style={{ width: "50%" }} label="search Movies" />
            <Tab style={{ width: "50%" }} label="search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="Trending">
        {Content &&
          Content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={Type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
          {SearchText && 
          !Content && 
          (Type ? <h2>no Series Found</h2> : <h2>no Movies Found</h2>)}
      </div>
      {numOfpages > 1 && (
        <CustomPagination setPage={setpage} numOfPages={numOfpages} />
      )}
    </div>
   
  );
};

export default Search;
