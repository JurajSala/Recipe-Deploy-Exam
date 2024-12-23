import { useState, useEffect } from "react";
import SUnit from "./components/SUnit";
import BezUnit from "./components/BezUnit";

const Components = ({ editComponents, setEditComponents, isId }) => {
  const [sUnit, setSUnit] = useState(editComponents.withUnit);
  const [bezUnit, setBezUnit] = useState(editComponents.withoutUnit);

  useEffect(() => {
    const uloz = () => {
      const prvek =
      {
        withUnit: sUnit,
        withoutUnit: bezUnit
      };
      setEditComponents(prvek);
    }
    uloz();
  }, [sUnit,bezUnit, setEditComponents ])

  const h3_text = (isId)? "Uprav nebo přidej příslušné komponenty:":"Přidej komponenty:";
  return (
    <>
      <h3>{ h3_text }</h3>
      <h4>Měřitelné komponenty</h4>
      <form id="sUnit">
        <SUnit
          sUnit={sUnit}
          setSUnit={setSUnit}
        /> 
      </form>
      <h4>Neměřitelné komponenty</h4>
      <form id="bezUnit">
        <BezUnit
          bezUnit={bezUnit}
          setBezUnit={setBezUnit}
        />
      </form>
    </>
  )
}

export default Components