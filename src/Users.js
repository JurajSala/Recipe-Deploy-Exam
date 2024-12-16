import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser, getUserId } from "./api/users_db"

const Users = function ({ logIn, currentUser }) {
    const [users, setUsers] = useState([]);
    const navigace = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                console.log(usersData);
                setUsers( usersData );
            } catch (error) {
                console.error( 'Chyba při načítání receptů:', error );
            }
        };
        if (!logIn) {
            navigace("/recepty");
        }
        fetchUsers();
    }, [logIn])

    const writeUserInConsole = async (userId) => {
        getUserId(userId)
            .then((data) => console.log(data.username))
    }


    const removeUser = async function (userId) {
        try {
            getUserId(userId)
                .then(
                    (data) => {
                        if (data.username !== "Michalka") {
                            try {
                                deleteUser(userId);
                                const newUsers = users.filter((item) => item._id !== userId);
                                setUsers(newUsers);
                            } catch (err) {
                                console.log(`Erroe:${err.message}`);
                            }

                        }
                    }
                )
        } catch (err) {
            console.log(`Erroe:${err.message}`);
        }
    }
    return (
        <div className="Home">
            <h2>Přehled uživatelů</h2>
            <hr></hr>
            {(users.length) ? <table>
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
                                {(currentUser.id === item._id) ?
                                    <td style={{ backgroundColor: "yellow" }}>
                                        {item.username}
                                    </td>
                                    : 
                                    <td>
                                        {item.username}
                                    </td>
                                }
                                {(currentUser.id === item._id) ?
                                <td>Přihlášený</td>
                                : 
                                <td onClick={() => removeUser(item._id)}>
                                    <button className="button">Odstranit</button>
                                </td>
                                }
                            </tr>
                        )
                    }
                </tbody>

            </table>
                : <p>Nenašli jsme žádného uživatele!!</p>
            }
        </div>
    )

}

export default Users;