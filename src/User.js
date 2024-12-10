import { useState } from "react";
import bcrypt from "bcryptjs";
import api from "./api/recepty";
import { useNavigate } from "react-router-dom";


function User() {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigace = useNavigate();

    function createUser() {
        const saltRounds = 10;

        // Hashování hesla
        bcrypt.hash(pass, saltRounds, function (err, hash) {
            if (err) throw err;

            console.log('Hashed heslo:', hash);

            // Ulož hashované heslo na JSON server
            // Zde můžeš použít HTTP knihovnu jako je `axios` nebo `fetch` pro uložení na JSON server
            const userData = {
                username: user,
                password: hash
            };

            api.post('/users', userData)
                .then(response => {
                    console.log('Uživatelské data uloženy:', response.data);
                })
                .catch(error => {
                    console.error('Chyba při ukládání uživatelských dat:', error);
                });
        });
        
        navigace("/")
    }

    return (
    <div className="LogIn">
        <h2>Vytvoř uživatele</h2>
        <form onSubmit={(e) => e.preventDefault()} >
            <input
                type="text"
                placeholder="Zadej uživatelské jméno"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <input
                id="logIn"
                type="password"
                placeholder="Zadej heslo"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <input type="submit" onClick={() => createUser()}/>
        </form>
    </div>
    )
}
export default User;