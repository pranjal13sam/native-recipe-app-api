CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"image" text,
	"title" text NOT NULL,
	"cook_time" text,
	"servings" text,
	"created_at" timestamp DEFAULT now()
);
