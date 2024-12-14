import PouchDB from 'pouchdb';

// Tvorba databáze
const recipesDb = new PouchDB('recipes_db');



/////////////////////////////////////////// Recepty /////////////////////////////////////

// Funkce pro přidání nového receptu
export const addRecipe = async (recipe) => {
  try {
    const newRecipe = {
      _id: new Date().toISOString(), // Generuje unikátní ID pro nový recept
      name: recipe.name,
      img: recipe.img,
      components:recipe.components,
      workFlow:recipe.workFlow
    };
    await recipesDb.put(newRecipe);
    console.log(newRecipe);
    return newRecipe;
  } catch (error) {
    console.error('Chyba při přidávání receptu:', error);
    throw error;
  }
};

// Funkce pro aktualizaci receptu
export const updateRecipe = async (recipeId, updatedRecipe) => {
  try {
    const recipe = await recipesDb.get(recipeId);
    console.log(recipe);
    const newRecipe = {...recipe, ...updatedRecipe };
    console.log(newRecipe);
    const response = await recipesDb.put(newRecipe);
    console.log(response);
    return newRecipe;
  } catch (error) {
    console.error('Chyba při aktualizaci receptu:', error);
    throw error;
  }
};

// Funkce pro získání všech receptů
export const getAllRecipes = async () => {
  try {
    const result = await recipesDb.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc); // vrátí všechny recepty
  } catch (error) {
    console.error('Chyba při načítání receptů:', error);
    throw error;
  }
}

// Mazání receptu 

export const deleteRecipe = async (recipeId) => {
  try {
    const recipe = await recipesDb.get(recipeId);
    await recipesDb.remove(recipe);
  } catch (error) {
    console.error('Chyba při mazání receptu:', error);
    throw error;
  }
};

// Vyhledání konkrétního receptu

export async function getRecipeById(recipeId) {
  try {
    const recipe = await recipesDb.get(recipeId);
    return recipe
  } catch (error) {
    console.error('Chyba při mazání receptu:', error);
    throw error;
  }
    
  }
  

