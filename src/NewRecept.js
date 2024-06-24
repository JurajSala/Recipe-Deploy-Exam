import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "./api/recepty";

import Name from "./editRecept/Name";
import Obrazek from "./editRecept/Obrazek";
import Components from "./editRecept/Components";
import WorkFlow from "./editRecept/WorkFlow";

const NewRecept = ({recepty, setRecepty}) => {
  const navigace=useNavigate();

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
      const id = recepty.length ? (recepty[recepty.length - 1].id + 1) : 1;
      const updateRecept = { id, name: editName.trim(), img: editImg, components: editComponents, workflow: editWorkFlow };
      const response = await api.post(`/recepty/`, updateRecept);
      const allRecepty=[...recepty,response.data];
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
          />
          <Obrazek
            editImg={editImg}
            setEditImg={setEditImg}
          />
          <Components
            editComponents={editComponents}
            setEditComponents={setEditComponents}
          />
          <WorkFlow
            editWorkFlow={editWorkFlow}
            setEditWorkFlow={setEditWorkFlow}
          />
           {mohuUlozitRecept(editName) &&          
          <input id="VlozButton" type="submit" value="Vytvoř nový recept" onClick={()=>{
            ulozNovyRecept(); navigace("/");} } />
           }
        </div>
  )
}

export default NewRecept