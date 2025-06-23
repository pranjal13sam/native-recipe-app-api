import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm"; // If using ES Modules

const app = express();
app.use(express.json());

const PORT = ENV.PORT || 3001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: true });
});

//api for adding a favorite recipe
app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    const newFavourite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();
      //.returning() does... Returns the row(s) that were just inserted


    res.status(201).json(newFavourite[0]);
  } catch (error) {
    console.log("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//api for deleting a favorite recipe
app.delete('/api/favorites/:userId/:recipeId',async(req,res)=>{
  try{
    const { userId, recipeId } = req.params;
    if (!userId || !recipeId) {
      return res.status(400).json({ error: "Missing required fields!" });
    }

    const deletedFavorite = await db
      .delete(favoritesTable)
      .where(
        and(eq(favoritesTable.userId,userId),eq(favoritesTable.recipeId,parseInt(recipeId)))
      )
    if (deletedFavorite.length === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
  }catch(error){
    console.log("Error deleting favorite:", error);
    res.status(500).json({ error: "Internal server error" });
    
  }
})

//api for getting all favorite recipes of a user
app.get('/api/favorites/:userId',async(req,res)=>{
  try{
    const {userId}=req.params;

    const userFavorites=await db.select().from(favoritesTable).where(eq(favoritesTable.userId,userId));

    res.json(userFavorites);
  }catch(error){
    console.log("Error getting favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
