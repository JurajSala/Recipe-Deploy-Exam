import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {addRecipe} from "./api/recipes_db"

import Name from "./editRecept/Name";
import Obrazek from "./editRecept/Obrazek";
import Components from "./editRecept/Components";
import WorkFlow from "./editRecept/WorkFlow";

const NewRecept = ({recepty, setRecepty}) => {
  const navigace=useNavigate();
  
  const isId = false;
  const [editName, setEditName] = useState("");
  const [editImg, setEditImg] = useState("");
  const [editComponents, setEditComponents] = useState({withUnit:[["",""]], withoutUnit:[""]});
  const [editWorkFlow, setEditWorkFlow] = useState([""]);

  
  const mohuUlozitRecept=(name)=>{
    const jmenaReceptu=recepty.map((item)=>item.name);
          if((jmenaReceptu.indexOf(name)<0) && (name.length>0) ){
            return true
          }else{
            return false
          }
  }

  const ulozNovyRecept = async () => {
    try {
      //const id = recepty.length ? ( parseInt( recepty[recepty.length - 1]._id ) + 1).toString() : (1).toString();
      const novyRecept = {  name: editName.trim(), img: editImg, components: editComponents, workFlow: editWorkFlow };
      console.log(novyRecept)
      const recipe = await addRecipe( novyRecept);
      console.log(recipe);
      const allRecepty=[...recepty, recipe];
      setRecepty(allRecepty);

    } catch (err) {
      console.log(`Erroe:${err.message}`);
    }
  }

  return (
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
           {mohuUlozitRecept(editName) &&          
          <input id="VlozButton" type="submit" value="Vytvoř nový recept" onClick={()=>{
            ulozNovyRecept(); navigace("/");} } />
           }
        </div>
  )
}

export default NewRecept