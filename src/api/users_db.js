import PouchDB from 'pouchdb';

// Tvorba databáze
const usersDb = new PouchDB('users_db');

//////////// Získání všech uživatelů ////////////////////////////////
export const getAllUsers = async () => {
    try {
      const result = await usersDb.allDocs({ include_docs: true });
      return result.rows.map(row => row.doc); // vrátí všechny uživatele
    } catch (error) {
      console.error('Chyba při načítání uživatelů:', error);
      throw error;
    }
  };

  ///////////////////// Přidání uživatele ///////////////////////////////////////
  export const addUser = async (user) => {
    try {
      const newUser = {
        _id: new Date().toISOString(), // Generuje unikátní ID pro nového uživatele
        username: user.username,
        password: user.password,
      };
      await usersDb.put(newUser);
      return newUser;
    } catch (error) {
      console.error('Chyba při přidávání uživatele:', error);
      throw error;
    }
  };

  // Funkce pro smazání uživatele
export const deleteUser = async (userId) => {
    try {
      const user = await usersDb.get(userId);
      await usersDb.remove(user);
    } catch (error) {
      console.error('Chyba při mazání uživatele:', error);
      throw error;
    }
  };

export const getUserId = async (userId)=> {
   try {
     const user = await usersDb.get(userId);
     return user;
   }catch(error){
    console.error('Chyba při hledání uživatele:', error);
   }
}