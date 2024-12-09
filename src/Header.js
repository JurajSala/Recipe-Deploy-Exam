
import { Link } from "react-router-dom";

const Header = ({title, logIn,setLogIn}) => {
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {!logIn && <Link to="/logIn">Upravovat</Link>}
        {logIn && <Link to="/" onClick={()=>setLogIn(false)}>Odhlásit</Link>}
        <Link to="/user">Nový uživatel</Link>
    </div>
  )
}

export default Header