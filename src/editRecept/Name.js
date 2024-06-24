import { useEffect } from "react";

const Name = ({editName, setEditName}) => {
    const ulozZmenu = (e) => {
        setEditName( e.target.value);
    }
    return (
        <h2>
            <form>
                <label forHtml="name">Zadej nebo uprav jméno receptu</label><br></br>
                <input
                    type="text"
                    name="name"
                    value={editName}
                    onChange={ulozZmenu}
                />
            </form>
        </h2>
    )
}

export default Name