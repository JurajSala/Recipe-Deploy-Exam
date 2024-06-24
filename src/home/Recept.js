import { Link } from "react-router-dom";

const Recept = ({ item }) => {
    return (
                <Link to={`/recept/${item.id}`}><h2>{item.name}</h2></Link>
    )
}

export default Recept