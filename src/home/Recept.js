import { Link} from "react-router-dom";

const Recept = ({ item }) => {
    //const navigace = useNavigate();
    // const removeRecipe = async (id) =>{
    //        try{
    //          await deleteRecipe(id);
    //          navigace("/");
    //        }catch(err){
    //         console.log(err.message)
    //        }
    // }
    return (  
                <Link to={`/recept/${item._id}`}><h2>{item.name}</h2></Link>
    )
}

export default Recept