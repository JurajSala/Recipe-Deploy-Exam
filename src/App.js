import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Header from "./Header";
import Footer from "./Footer";
import LogIn from "./LogIn";
import ReceptPage from "./ReceptPage";
import Nav from "./Nav";
import Home from "./Home";
import EditRecept from "./EditRecept";
import NewRecept from "./NewRecept";
import Uvod from "./Uvod";
import User from "./User";
import Users from "./Users"

import { getAllRecipes } from './api/recipes_db'

function App() {
  const [recepty, setRecepty] = useState([]);
  const [search, setSearch] = useState("");
  // const [selectRecept, setSelectRecept] = useState("");
  // const [editRecept, setEditRecept] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [logIn, setLogIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ userName: "", order: 0, id:"" });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getAllRecipes();
        setRecepty(recipesData);
        console.log(recipesData);
      } catch (error) {
        console.error('Chyba při načítání receptů:', error);
      }
    };
    fetchRecipes();
  }, []);


  return (
    <div className="App">
      <Router>
        <Header
          title="Receptů Michalky Šálové"
          logIn={logIn}
          setLogIn={setLogIn}
          recepty={ recepty }
          currentUser = { currentUser }
          setCurrentUser={setCurrentUser}
        />
        < Nav
          recepty={recepty}
          search={search}
          setSearch={setSearch}
          setSearchResults={setSearchResult}
          logIn={logIn} />

        <Routes>
          <Route path="/logIn"
            element={<LogIn
              setLogIn={setLogIn}
              setCurrentUser={setCurrentUser}
            />} />
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
          <Route path="/recepty" element={<Home data={searchResult} />} />
          <Route path="/" element={<Uvod />} />
          <Route path="/user" element={<User />} />
          <Route path="/users" element={<Users logIn = {logIn} currentUser = {currentUser}/>} />

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
