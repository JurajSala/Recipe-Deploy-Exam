

const Name = ({editName, setEditName, isId}) => {
    const ulozZmenu = (e) => {
        setEditName( e.target.value);
    }
    const h3_text = (isId)? "Uprav název receptu:":"Zadej název receptu:";
    return (
        <h2>
            <form autoComplete="on">
                <label htmlFor="name">{h3_text}</label><br></br>
                <input
                    placeholder="Zde zadej název receptu"
                    type="text"
                    name="name"
                    id="name"
                    value={editName}
                    onChange={ulozZmenu}
                    autoComplete="on"
                    required
                />
            </form>
        </h2>
    )
}

export default Name