from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
from werkzeug.exceptions import BadRequest
import re


# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
    name: str


@dataclass
class RequiredItem:
    name: str
    quantity: int


@dataclass
class Recipe(CookbookEntry):
    required_items: List[RequiredItem]


@dataclass
class Ingredient(CookbookEntry):
    cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}


# Task 1 helper (don't touch)
@app.route("/parse", methods=["POST"])
def parse():
    data = request.get_json()
    recipe_name = data.get("input", "")
    parsed_name = parse_handwriting(recipe_name)
    if parsed_name is None:
        return "Invalid recipe name", 400
    return jsonify({"msg": parsed_name}), 200


# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that
def parse_handwriting(recipeName: str) -> Union[str | None]:
    otherCharsPattern = r"[^a-zA-Z\s\-_]"
    newRecipeName = re.sub(r"[\-_]", " ", recipeName)
    newRecipeName = re.sub(otherCharsPattern, "", newRecipeName)
    newRecipeName = newRecipeName.lower()
    newRecipeName = newRecipeName.capitalize()
    newRecipeName = re.sub(
        r"(\s+)([a-z])", lambda x: x.group(1) + x.group(2).upper(), newRecipeName
    )
    newRecipeName = re.sub(r"\s+", " ", newRecipeName).strip()

    if len(newRecipeName) > 0:
        return newRecipeName
    else:
        return None


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route("/entry", methods=["POST"])
def create_entry():
    # TODO: implement me
    try:
        entry = request.get_json()

        if "type" not in entry or "name" not in entry:
            return "Missing type or name", 400

        entryType = entry["type"]
        entryName = entry["name"]

        if entryType not in ["recipe", "ingredient"]:
            return 'Type can only be "recipe" or "ingredient"', 400

        if entryName in cookbook:
            return "Entry names must be unique", 400

        if entryType == "ingredient":
            if "cookTime" not in entry:
                return "No provided cook time", 400
            if not isinstance(entry["cookTime"], int):
                return "No provided cook time", 400
            elif entry["cookTime"] < 0:
                return "Cook time must be a positive integer", 400
            cookbook[entryName] = entry
        elif entryType == "recipe":
            if "requiredItems" not in entry or not isinstance(
                entry["requiredItems"], list
            ):
                return "Invalid requiredItems format", 400

            required_items_seen = set()
            for item in entry["requiredItems"]:
                if "name" not in item or "quantity" not in item:
                    return "Required item missing name or quantity", 400
                if item["name"] in required_items_seen:
                    return (
                        "Recipe requiredItems can only have one element per name.",
                        400,
                    )
                if not isinstance(item["name"], str) or not isinstance(
                    item["quantity"], int
                ):
                    return (
                        "Required item name must be a string and quantity must be an integer",
                        400,
                    )
                if item["quantity"] < 0:
                    return "Required item quantity must be a positive integer", 400
                required_items_seen.add(item["name"])
            cookbook[entryName] = entry

        return "", 200
    except Exception as e:
        return "Internal server error", 500


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route("/summary", methods=["GET"])
def summary():
    ingredients = {}
    result = { "name": "", "cookTime": 0, "ingredients": [] }

    def recursive_recipes(entry_data, total_cook_time=0):
        print(entry_data)
        requiredItems = entry_data["requiredItems"]
        for item in requiredItems:
            item_name = item["name"]
            item_quantity = item["quantity"]

            # if item is in cookbook, check if ingredient or recipe
            if item_name in cookbook:
                item_data = cookbook[item_name]
                # if ingredient, add to ingredients
                if item_data["type"] == "ingredient":
                    ingredients[item_name] = ingredients.get(item_name, 0) + item_quantity
                    # if ingredient add cook time * item quantity
                    total_cook_time += item_quantity * item_data["cookTime"]
                    continue
                else:

                    total_cook_time = recursive_recipes(
                        cookbook[item_name], total_cook_time
                    )
            else:
                raise BadRequest(f"'{item_name}' is not in the cookbook.")
        return total_cook_time

    try:
        summary_name = request.args.get("name")

        if summary_name not in cookbook:
            raise BadRequest("Entry not found")
        entry_data = cookbook[summary_name]
        if entry_data["type"] == "ingredient":
            raise BadRequest("Entry is an ingredient")
        result["name"] = summary_name
        total_cook_time = recursive_recipes(entry_data)
        result["cookTime"] = total_cook_time
        result["ingredients"] = [
            {"name": name, "quantity": quantity}
            for name, quantity in ingredients.items()
        ]
        return result, 200
    except BadRequest as e:
        # Flask automatically handles the 400 status code for BadRequest exceptions
        return f"Error: {str(e)}", 400
    except Exception as e:
        return "Internal server error", 500


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == "__main__":
    app.run(debug=True, port=8080)
