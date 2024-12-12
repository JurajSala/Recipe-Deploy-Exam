

const Obrazek = ({editImg, setEditImg}) => {
  return (
    <>
    <h3>Zadej URL obrázku</h3>
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