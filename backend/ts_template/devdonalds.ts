import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Record<string, recipe | ingredient> = {};

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  const otherCharsPattern = /[^a-zA-Z\s\-_]/g;
  let newRecipeName = recipeName.replace(/[-_]/g, " ");
  newRecipeName = newRecipeName.replace(otherCharsPattern, "");
  newRecipeName = newRecipeName.toLowerCase();
  // \b matches non word character before [a-z]
  newRecipeName = newRecipeName.replace(/\b[a-z]/g, (char) =>
    char.toUpperCase()
  );
  newRecipeName = newRecipeName.replace(/\s+/g, " ").trim();

  return newRecipeName.length > 0 ? newRecipeName : null;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  try {
    const entry = req.body;

    if (!entry.type || !entry.name) {
      return res.status(400).send("Missing type or name");
    }

    if (entry.type !== "recipe" && entry.type !== "ingredient") {
      return res.status(400).send('Type can only be "recipe" or "ingredient"');
    }

    if (cookbook[entry.name]) {
      return res.status(400).send("Entry names must be unique");
    }

    if (entry.type === "ingredient") {
      if (typeof entry.cookTime !== "number" || entry.cookTime < 0) {
        return res.status(400).send("Cook time must be a positive integer");
      }
      cookbook[entry.name] = entry as ingredient;
    } else {
      if (!Array.isArray(entry.requiredItems)) {
        return res.status(400).send("Invalid requiredItems format");
      }
      const requiredItemsSeen = new Set<string>();
      for (const item of entry.requiredItems) {
        if (
          !item.name ||
          typeof item.quantity !== "number" ||
          item.quantity < 0
        ) {
          return res.status(400).send("Invalid requiredItem format");
        }
        if (requiredItemsSeen.has(item.name)) {
          return res
            .status(400)
            .send("Recipe requiredItems must have unique names");
        }
        requiredItemsSeen.add(item.name);
      }
      cookbook[entry.name] = entry as recipe;
    }
    return res.status(200).send("");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!");
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
