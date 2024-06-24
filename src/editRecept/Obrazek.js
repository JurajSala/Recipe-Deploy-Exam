

const Obrazek = ({editImg, setEditImg}) => {
  return (
    <>
    <h3>Zadej URL obrázku</h3>
    <input
      type="url"
      value={editImg}
      onChange={(e)=>setEditImg(e.target.value)}
    />
    </>
  )
}

export default Obrazek