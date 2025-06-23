//we are using postgres as our database
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  //serial means auto incrementing integer
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  recipeId: integer("recipe_id").notNull(),
  image: text("image"),
  title: text("title").notNull(),
  cookTime: text("cook_time"),
  servings: text("servings"),
  createdAt: timestamp("created_at").defaultNow(),
});
