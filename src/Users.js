import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAllUsers, deleteUser } from "./api/users_db"

const Users = function (logIn) {
    const [users, setUsers] = useState([]);
    const navigace = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
              try {
                const usersData = await getAllUsers();
                console.log( usersData );
                setUsers(usersData);
              } catch (error) {
                console.error('Chyba při načítání receptů:', error);
              }
            };
            if(!logIn){
            navigace("/recepty");     
            }
            fetchUsers();
    }, [])
    

    const  remove = async function(id) {
        try{
            await deleteUser(id);
            const newUsers = users.filter( (item) => item._id !== id );
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
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td onClick={() => remove(item._id)}> 
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