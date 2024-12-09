
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Nav = ({ recepty, search, setSearch, setSearchResults,logIn }) => {

    useEffect(() => {
        const filterResult = recepty.filter((recept) => (
            ((recept.name).toLowerCase()).includes(search.toLowerCase())

        ))
        setSearchResults(filterResult);
    }, [recepty, search, setSearchResults])
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Najdi recept </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Zadej hledaný recept"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Domů</Link></li>
                <li><Link to="/recepty">Recepty</Link></li>
                {logIn&&
                <li className="button"><Link to="/newRecept">Přidat recept</Link></li>}
            </ul>
        </nav>
    )
}
export default Nav