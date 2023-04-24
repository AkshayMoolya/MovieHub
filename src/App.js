import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Container } from "@mui/material";
import "../src/App.css";
import Header from "./component/Header/Header";
import SimpleBottomNavigation from "./component/navigation/Mainnav";
import Trending from "./component/Pages/Trending/Trending";
import Movies from "./component/Pages/Movies/Movies";
import Series from "./component/Pages/Series/Series";
import Search from "./component/Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" Component={Trending} exact />
            <Route path="/movies" Component={Movies} />
            <Route path="/series" Component={Series} />
            <Route path="/search" Component={Search} />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
