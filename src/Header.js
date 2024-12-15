
import { Link } from "react-router-dom";

const Header = ({ title, logIn, setLogIn, recepty, currentUser, setCurrentUser }) => {
  return (
    <div className='Header'>
      <h2 className="count"> 
        <div>
          <span className="number  animation-rotate-y animation-rotate-x" >
            {recepty.length}
          </span>
        </div> 
        <img className="animation-kmitani" alt="čepec" src="https://cdn.pixabay.com/photo/2019/11/30/07/41/cooking-4662712_640.png"/>
      </h2>
      <h1>
        {title}
      </h1>
      {(logIn) ?
        <div className="col">
          <div className="inline">
            <Link to="/" onClick={() => {
              setLogIn(false);
              setCurrentUser({ userName: "", order: 0, id:"" })
            }} className="button">X</Link>
            <Link to="/user" className="button">Nový uživatel</Link>
          </div>
          <span style={{color:"yellow", margin:"10px", border:"solid 1px black", padding:"5px"}}> {currentUser.userName} {" -> "} {currentUser.order}</span>
        </div>
        :
        <div className="col">
          <Link to="/logIn">LogIn</Link>
          <span style={{color:"yellow", margin:"10px", border:"solid 1px black", padding:"5px"}}> Nepřihlášen </span>
        </div>
      }
    </div>
  )
}

export default Header