import { useEffect } from "react";

const Name = ({editName, setEditName}) => {
    const ulozZmenu = (e) => {
        setEditName( e.target.value);
    }
    return (
        <h2>
            <form autoComplete="on">
                <label htmlFor="name">Zadej nebo uprav jméno receptu</label><br></br>
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