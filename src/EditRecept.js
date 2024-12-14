
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {updateRecipe} from "./api/recipes_db";

import Name from "./editRecept/Name";
import Obrazek from "./editRecept/Obrazek";
import Components from "./editRecept/Components";
import WorkFlow from "./editRecept/WorkFlow";


const EditRecept = ({ recepty, setRecepty }) => {
  const { id } = useParams();
  const navigace=useNavigate();
  
  const [isId, setIsId] = useState(false);
  const [editName, setEditName] = useState();
  const [editImg, setEditImg] = useState();
  const [editComponents, setEditComponents] = useState();
  const [editWorkFlow, setEditWorkFlow] = useState()

  useEffect(() => {
    if (id) {
      setIsId(true);
      const receptSelect = recepty.find((item) => (item._id).toString() === id);
      setEditName(receptSelect.name);
      setEditImg(receptSelect.img);
      setEditComponents(receptSelect.components);
      setEditWorkFlow(receptSelect.workFlow);
    }
  }, [recepty])


  const ulozEditRecept = async () => {

    try {
      const updateRecept = { name: editName, img: editImg, components: editComponents, workFlow: editWorkFlow };
      const recipe = await updateRecipe(id, updateRecept);
      console.log(recepty.map((recept) => (recept._id).toString() === id ? {...recipe, ...updateRecept} : recept));
      setRecepty(recepty.map((recept) => (recept._id).toString() === id ? {...recipe, ...updateRecept}: recept));
      navigace("/");
    } catch (err) {
      console.log(`Erroe:${err.message}`);
    }
  }

  return (
    <>
      {editName &&
        <div className='ReceptPage'>
          <Name
            editName={editName}
            setEditName={setEditName}
            isId = {isId}
          />
          <Obrazek
            editImg={editImg}
            setEditImg={setEditImg}
            isId = {isId}
          />
          <Components
            editComponents={editComponents}
            setEditComponents={setEditComponents}
            isId = {isId}
          />
          <WorkFlow
            editWorkFlow={editWorkFlow}
            setEditWorkFlow={setEditWorkFlow}
            isId = {isId}
          />
          <input type="submit" value="Ulož recept" onClick={()=>{
            ulozEditRecept();} } />
        </div>
      }
      {!editName &&
        <>
          <h2>Stránka nenalezena</h2>
          <p>To jsi překvapen/na.</p>
          <p>
            <Link to="/">Domů.</Link>
          </p>
        </>
      }
    </>
  )
}

export default EditRecept