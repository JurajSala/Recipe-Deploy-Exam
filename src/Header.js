
import { Link } from "react-router-dom";

const Header = ({title, logIn,setLogIn}) => {
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {(logIn)?
        <div className="inline">
          <Link to="/" onClick={()=>setLogIn(false)} className="button">X</Link>
          <Link to="/user" className="button">Nový uživatel</Link>
        </div>
          : <Link to="/logIn">LogIn</Link>
        }
    </div>
  )
}

export default Header