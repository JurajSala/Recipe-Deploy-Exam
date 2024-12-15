
import { Link } from "react-router-dom";

const Header = ({title, logIn,setLogIn, recepty}) => {
  return (
    <div className='Header'>
       <h2 className="count"> <div><span className="number  animation-rotate-y animation-rotate-x" >{recepty.length}</span></div> <img className="animation-kmitani" alt="čepec" src="https://cdn.pixabay.com/photo/2019/11/30/07/41/cooking-4662712_640.png"></img></h2>
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