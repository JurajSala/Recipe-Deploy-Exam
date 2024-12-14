

const WorkFlow = ({ editWorkFlow, setEditWorkFlow , isId}) => {
  const ulozZmenu = (e) => {
    const poleNove = editWorkFlow.map((item) => (editWorkFlow.indexOf(item) == e.target.id) ? e.target.value : item);
    setEditWorkFlow(poleNove);
  }

  const odebratBoolean = () => {
    const polePlne = editWorkFlow.filter(item => item !== "");
    const countFullRow = polePlne.length;
    if (countFullRow < editWorkFlow.length) {
      if ((editWorkFlow.length - countFullRow) > 1) {
        setEditWorkFlow([...polePlne, ""]);
      }
      return true
    }
    else {
      return false
    }

  }

  const pridatRow = () => {
    setEditWorkFlow([...editWorkFlow, ""]);
  }

  const odebratRow = () => {
    setEditWorkFlow(editWorkFlow.filter(item => item !== ""));
  }

  const h3_text = (isId)? "Uprav nebo přidej příslušné kroky postupu:":"Přidej kroky postupu:";
  return (
    <>
      <h3>{h3_text}</h3>
      <ol className="workFlow">
        {editWorkFlow.map((polozka, index) => <li key={index}>
          <form autoComplete="on">
            <textarea
              name={index}
              id={editWorkFlow.indexOf(polozka)}
              value={polozka}
              onChange={ulozZmenu}
              placeholder="Zde zadej další krok"
            />
          </form></li>)}
        {odebratBoolean() && <button name="minus" onClick={odebratRow}> - </button>}
        {!odebratBoolean() && <button name="plus" onClick={pridatRow}>+</button>}
      </ol>

    </>
  )
}

export default WorkFlow