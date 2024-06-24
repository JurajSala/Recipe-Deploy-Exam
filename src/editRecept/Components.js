import { useState, useEffect } from "react";
import SUnit from "./components/SUnit";
import BezUnit from "./components/BezUnit";

const Components = ({ editComponents, setEditComponents }) => {
  const [sUnit, setSUnit] = useState(editComponents.withUnit);
  const [bezUnit, setBezUnit] = useState(editComponents.withoutUnit);

  useEffect(() => {
    const uloz = () => {
      const prvek =
      {
        sUnit: sUnit,
        bezUnit: bezUnit
      };
      setEditComponents(prvek);
    }
    uloz();
  }, [sUnit, bezUnit, setBezUnit, setSUnit])


  return (
    <>
      <h3>Uprav nebo zadej příslušné komponenty</h3>
      <SUnit
        sUnit={sUnit}
        setSUnit={setSUnit}
      /> 
      
      <BezUnit
        bezUnit={bezUnit}
        setBezUnit={setBezUnit}
      />
    </>
  )
}

export default Components