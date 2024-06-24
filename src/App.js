import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import LogIn from "./LogIn";
import ReceptPage from "./ReceptPage";
import Nav from "./Nav";
import Home from "./Home";
import EditRecept from "./EditRecept";
import NewRecept from "./NewRecept";

import api from "./api/recepty";
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [recepty, setRecepty] = useState([]);
  const [search, setSearch] = useState("");
  const [selectRecept, setSelectRecept] = useState("");
  const [editRecept, setEditRecept] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [logIn, setLogIn] = useState(false);
  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3050/recepty");

  useEffect(() => {
    setRecepty(data);
  }, [data]);


  return (
    <div className="App">
      <Router>
        <Header
          title="Sbírka receptů Míši Šálové"
          logIn={logIn}
        />
        < Nav
          recepty={recepty}
          search={search}
          setSearch={setSearch}
          setSearchResults={setSearchResult}
          logIn={logIn} />

        <Routes>
          <Route path="/logIn" element={<LogIn setLogIn={setLogIn} />} />
          <Route path="/recept/:id" 
            element={<ReceptPage
            recepty={recepty}
            setRecepty={setRecepty}
            logIn={logIn}
          />} />
          {logIn &&
            <Route path="/editRecept/:id" element={<EditRecept
              recepty={recepty}
              setRecepty={setRecepty}
            />} />
          }
          {logIn &&
            <Route path="/newRecept" element={<NewRecept 
              recepty={recepty}
              setRecepty={setRecepty}
            />} />
          }
          <Route path="/" element={<Home data={searchResult} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
