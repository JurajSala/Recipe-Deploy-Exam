import { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

import { addUser } from "./api/users_db";


function User() {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigace = useNavigate();

    const createUser = function () {
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

            addUser(userData)
                .then(response => {
                    console.log('Uživatelské data uloženy:', response.data);
                })
                .catch(error => {
                    console.error('Chyba při ukládání uživatelských dat:', error);
                });
        });

        navigace("/")
    }

    const showPassword = function () {
        const pass = document.querySelector("#newUser #password");
        console.log(pass);
        const typeValue = pass.getAttribute("type");
        if (typeValue == "password") {
            pass.setAttribute("type", "text")
        } else {
            pass.setAttribute("type", "password")
        }

    }

    return (
        <div className="LogIn">
            <h2>Vytvoř uživatele</h2>
            <form onSubmit={(e) => e.preventDefault()} id="newUser" name="newUser" autoComplete="on">
                <input
                    name="name"
                    id="logName"
                    type="text"
                    placeholder="Zadej uživatelské jméno"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Zadej heslo"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <div>
                <input
                    name="showPass"
                    type="checkbox"
                    onChange={showPassword}
                    id="showPass"
                />
                <label htmlFor="showPass">Kontrola hesla</label>
                </div>
                

                <input type="submit" onClick={() => createUser()} name="submit" id="submit" />
            </form>
        </div>
    )
}
export default User;