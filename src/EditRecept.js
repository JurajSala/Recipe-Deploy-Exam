
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/recepty";

import Name from "./editRecept/Name";
import Obrazek from "./editRecept/Obrazek";
import Components from "./editRecept/Components";
import WorkFlow from "./editRecept/WorkFlow";


const EditRecept = ({ recepty, setRecepty }) => {
  const { id } = useParams();
  const receptSelect = recepty.find((item) => (item.id).toString() === id);
  const navigace=useNavigate();

  const [editName, setEditName] = useState(receptSelect.name);
  const [editImg, setEditImg] = useState(receptSelect.img);
  const [editComponents, setEditComponents] = useState(receptSelect.components);
  const [editWorkFlow, setEditWorkFlow] = useState(receptSelect.workflow)

  useEffect(() => {
    if (receptSelect) {
      setEditName(receptSelect.name);
      setEditImg(receptSelect.img);
      setEditComponents(receptSelect.components);
      setEditWorkFlow(receptSelect.workflow);
    }
  }, [recepty, setRecepty])


  const ulozEditRecept = async () => {

    try {
      const updateRecept = { id, name: editName, img: editImg, components: editComponents, workflow: editWorkFlow };
      const response = await api.put(`/recepty/${id}`, updateRecept);
      console.log(recepty.map((recept) => (recept.id).toString() === id ? { ...response.data } : recept));
      setRecepty(recepty.map((recept) => (recept.id).toString() === id ? { ...response.data } : recept));

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
          <input type="submit" value="Ulož recept" onClick={()=>{
            ulozEditRecept(); navigace("/");} } />
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