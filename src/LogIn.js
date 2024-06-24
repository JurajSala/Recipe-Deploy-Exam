import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const LogIn = ({ setLogIn }) => {
    const heslo = "987654321";
    const [insertPass, setInsertPass] = useState("");
    const [pocetLog, setPocetLog] = useState(0);
    const navigace=useNavigate();

const nastavLogIn = () => {
        if (insertPass === heslo) {
            setLogIn(true);
            navigace("/"); 
        }else{
            let pocet=pocetLog;
            console.log(pocetLog);
            setPocetLog(pocet+1);
            
        }
    }


    return ((pocetLog<10)?
           <div className='LogIn'>
            {( pocetLog == 0 )?<h2>Pro možnost upravovat a publikovat recepty je třeba zadat heslo:</h2>:<h2>Zkuste to znovu a lépe</h2>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    id="logIn"
                    type="password"
                    placeholder="Zadej heslo"
                    value={insertPass}
                    onChange={(e) => setInsertPass(e.target.value)}
                />
                <input type="submit" onClick={() => nastavLogIn()} />
            </form>
        </div>:<div className="LogIn"><h2>To už stačilo.</h2> <Link to="/">Domů</Link></div>
    )
}

export default LogIn