

const SUnit = ({ sUnit, setSUnit }) => {

  const ulozZmenu = (e) => {
    console.log((e.target.id).substring(1));
    if ((e.target.id).substring(1) === "a") {
      
      const poleNove = sUnit.map((item) => ((sUnit.indexOf(item)).toString() === (e.target.id).substring(0, 1)) ? [e.target.value, item[1]] : item);
      setSUnit(poleNove);
    } else {
      const poleNove = sUnit.map((item) => ((sUnit.indexOf(item)).toString() === (e.target.id).substring(0, 1)) ? [item[0], e.target.value] : item);
      setSUnit(poleNove);
    }
  }


  const odebratBoolean = () => {
    const polePlne = sUnit.filter(item => ((item[0]!=="")||(item[1]!=="")));
    console.log(polePlne);
    const countFullRow=polePlne.length;
    if (countFullRow < sUnit.length) {
        if((sUnit.length-countFullRow)>1){
        setSUnit([...polePlne,["",""]]); 
      }
        return true
    }
    else {

        return false
    }
  }
  const pridatRow = () => {
    setSUnit([...sUnit, ["",""]]);
  }

  const odebratRow = () => {
    setSUnit(sUnit.filter(item => ((item[0]!=="")||(item[1]!==""))));
  }
  return (
    <ul className='Komponenty'>
      {sUnit.map((element, index) =>
        <li key={index}>
          <input
            placeholder="Název složky"
            id={sUnit.indexOf(element) + "a"}
            type="text"
            value={element[0]}
            onChange={ulozZmenu}
          />
          <input
          placeholder="Množství"
            id={sUnit.indexOf(element) + "b"}
            type="text"
            value={element[1]}
            onChange={ulozZmenu}
          />
        </li>)}
      {odebratBoolean() && <button name="minus" onClick={odebratRow}> - </button>}
      {!odebratBoolean() && <button name="plus" onClick={pridatRow}>+</button>}
    </ul>
  )
}

export default SUnit