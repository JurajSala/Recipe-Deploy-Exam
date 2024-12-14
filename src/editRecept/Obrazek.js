

const Obrazek = ({editImg, setEditImg, isId}) => {

  const h3_text = (isId)? "Uprav URL receptu:":"Přidej URL receptu:";
  return (
    <>
    <h3>{h3_text}</h3>
    <input
      name="img"
      placeholder="Zde zadej URL obrazku"
      type="url"
      value={editImg}
      onChange={(e)=>setEditImg(e.target.value)}
    />
    </>
  )
}

export default Obrazek