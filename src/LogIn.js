import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAxiosFetch from './hooks/useAxiosFetch';
import bcrypt from "bcryptjs";

const LogIn = ({ setLogIn }) => {
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3005/users");
    const [users, setUsers] = useState([]);
    const [insertUser, setInsertUser] = useState("");
    const [insertPass, setInsertPass] = useState("");
    const [pocetLog, setPocetLog] = useState(0);
    const navigace = useNavigate();

    useEffect(() => {
        setUsers(data);
    }, [data]);

    const overLogIn = async () => {
        const user = users.find((item) => item["username"] === insertUser);
        if (user) {
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
        let pocet = pocetLog;
        setPocetLog(pocet + 1);
    }


    return ((pocetLog < 3) ?
        <div className='LogIn'>
            {(pocetLog == 0) ? <h2>Pro možnost upravovat a publikovat recepty je třeba zadat uživatelské jméno a heslo:</h2> : <h2>Zkuste to znovu a lépe</h2>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Zadej uživatelské jméno"
                    value={insertUser}
                    onChange={(e) => setInsertUser(e.target.value)}
                />
                <input
                    id="logIn"
                    type="password"
                    placeholder="Zadej heslo"
                    value={insertPass}
                    onChange={(e) => setInsertPass(e.target.value)}
                />
                <input type="submit" onClick={() => overLogIn()} />
            </form>
        </div> : <div className="LogIn"><h2>To už stačilo.</h2> <Link to="/">Domů</Link></div>
    )
}

export default LogIn