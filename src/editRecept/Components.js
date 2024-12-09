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
        withUnit: sUnit,
        withoutUnit: bezUnit
      };
      setEditComponents(prvek);
    }
    uloz();
  }, [sUnit, bezUnit, setBezUnit, setSUnit])


  return (
    <>
      <h3>Uprav nebo zadej příslušné komponenty</h3>
      <form id="sUnit">
        <SUnit
          sUnit={sUnit}
          setSUnit={setSUnit}
        /> 
      </form>
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