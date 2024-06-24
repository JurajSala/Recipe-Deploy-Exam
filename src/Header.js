
import { Link } from "react-router-dom";

const Header = ({title, logIn}) => {
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {!logIn && <Link to="/logIn">Upravovat</Link>}
    </div>
  )
}

export default Header