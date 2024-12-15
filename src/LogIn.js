import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { getAllUsers } from "./api/users_db";

const LogIn = ({ setLogIn }) => {
    const [users, setUsers] = useState([]);
    const [insertUser, setInsertUser] = useState("");
    const [insertPass, setInsertPass] = useState("");
    const [pocetLog, setPocetLog] = useState(0);
    const navigace = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Chyba při načítání receptů:', error);
            }
        };
        fetchUsers();
    }, [users]);

    const overLogIn = async () => {
        const sameUser = users.filter((item) => item.username === insertUser);
        console.log(sameUser)
        if (sameUser.length) {
            const tryUser = async function(user){
                try {
                    const isMatch = await bcrypt.compare(insertPass, user["password"]);
                    if (isMatch) {
                        setLogIn(true);
                        navigace("/");
                    } else {
                        let pocet = pocetLog;
                        setPocetLog(pocet + 1);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            sameUser.forEach(user => {
                tryUser(user);
            }
            )
        }
        let pocet = pocetLog;
        setPocetLog(pocet + 1);
    }
    const showPassword = function () {
        const pass = document.querySelector("#loginForm #password");
        console.log(pass);
        const typeValue = pass.getAttribute("type");
        if (typeValue === "password") {
            pass.setAttribute("type", "text")
        } else {
            pass.setAttribute("type", "password")
        }

    }

    return ((pocetLog < 3) ?
        <div className='LogIn'>
            {(pocetLog === 0) ? <h2>Pro možnost upravovat a publikovat recepty je třeba zadat uživatelské jméno a heslo:</h2> : <h2>Zkuste to znovu a lépe</h2>}
            <form onSubmit={(e) => e.preventDefault()} id="loginForm" autoComplete="on">
                <input
                    id="userName"
                    type="text"
                    placeholder="Zadej uživatelské jméno"
                    value={insertUser}
                    onChange={(e) => setInsertUser(e.target.value)}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Zadej heslo"
                    value={insertPass}
                    onChange={(e) => setInsertPass(e.target.value)}
                />
                <div>
                    <input
                        name="showPass"
                        type="checkbox"
                        onChange={showPassword}
                        id="showPass"
                    />
                    <label htmlFor="showPass">Zobrazit heslo</label>
                </div>
                <input type="submit" onClick={() => overLogIn()} id="submit" />
            </form>
        </div> : <div className="LogIn"><h2>To už stačilo. Zkus to zase za chvíli.</h2> <Link to="/">Domů</Link></div>
    )
}

export default LogIn