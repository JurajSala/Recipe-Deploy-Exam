import { useEffect, useState } from "react";
import api from "./api/recepty";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";

const Users = function (logIn) {
    const [users, setUsers] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3005/users");
    const navigace = useNavigate();

    useEffect(() => {
        if(!logIn){
            navigace("/recepty");
        }
        setUsers(data);
    }, [data])
    

    const  remove = async function(id) {
        try{
            await api.delete(`/users/${id}`);
            const newUsers = users.filter( (item) => item.id !== id );
            setUsers(newUsers)
        }catch(err){
            console.log(`Erroe:${err.message}`);
        }
        
    }


    return (
        <div className="Home">
           <h2>Přehled uživatelů</h2>
           <hr></hr>
           {(users.length)?<table>
                <thead>
                    <tr>
                        <th>Uživatelské jméno</th>
                        <th>##</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item) =>
                            <tr >
                                <td>{item.username}</td>
                                <td onClick={() => remove(item.id)}> 
                                    <button className="button">Odstranit</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
            :<p>Nenašli jsme žádného uživatele!!</p>
            }         
        </div>
    )

}

export default Users;