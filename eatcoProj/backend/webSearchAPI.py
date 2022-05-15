from googlesearch import search
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests, os, json

load_dotenv()

def lookupRecipes(search_string):
    recipes = []
    results = []
    trees_saved = 0
    search_query = (search_string + ' "vegetarian" site:allrecipes.com').lower()
    if "chicken" in search_query:
        trees_saved = 7
    elif ("beef" in search_query) or ("steak" in search_query) or ("burger" in search_query):
        trees_saved = 55
    elif "goat" in search_query:
        trees_saved = 40
    elif ("pork" in search_query) or ("ribs" in search_query):
        trees_saved = 20
    for link in search(search_query, tld='com', lang='en', num=6, start=0, stop=6, pause=100):
        if '/recipe/' in link:
            result = requests.get(link)
            results.append(BeautifulSoup(result.text, "html.parser"))
  
    for i, result in enumerate(results):
        rTitle = result.find(("h1"), {"class":"headline heading-content elementFont__display"}).text
        rImage = result.find(("div"), {"class":"inner-container js-inner-container image-overlay"}).find(("button"))['data-image']
        recipes.append({})
        recipes[i]["image"] = rImage
        rTitle = rTitle.replace('\'', '')
        recipes[i]["title"] = rTitle
        recipes[i]["ingredients"] = []
        recipes[i]["instructions"] = []
        recipes[i]["trees_saved"] = trees_saved
        for ingredient in result.find(("ul"),{"class":"ingredients-section"}).find_all(("li"), {"class":"ingredients-item"}):
            text_to_add = ingredient.text.strip()
            text_to_add = text_to_add.replace('\'', '')
            recipes[i]["ingredients"].append(text_to_add)
        for instruction in result.find(("ul"),{"class":"instructions-section"}).find_all("p"):
            text_to_add = instruction.text
            text_to_add = text_to_add.replace('\'', '')
            recipes[i]["instructions"].append(text_to_add)
              
    return{"recipes": recipes}

    # recipes = []
    # search_query_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=" + os.environ.get('RECIPE_APP_ID') + "&app_key=" + os.environ.get('RECIPE_APP_KEY') + "&health=vegetarian&q=" + search_string
    # recipes_response = requests.get(search_query_url)
    # recipes_data = json.loads(recipes_response.text)
    # del recipes_data['hits'][6:]
    # for i, hit in enumerate(recipes_data['hits']):
    #     recipes.append({})

    #     recipes[i]['title'] = hit['recipe']['label']
    #     recipes[i]['ingredients'] = hit['recipe']['ingredientLines']
    #     recipes[i]['url'] = hit['recipe']['url']

    #     recipe_uri = hit['recipe']['uri']
    #     image_query_url = "https://api.edamam.com/api/recipes/v2/" + recipe_uri[recipe_uri.rfind('_'):] + "?type=public&app_id=" + os.environ.get('RECIPE_APP_ID') + "&app_key=" + os.environ.get('RECIPE_APP_KEY') + "&field=image"
    #     image_query_response = requests.get(image_query_url)
    #     image_query_data = json.loads(image_query_response.text)
    #     recipes[i]['image'] = image_query_data['recipe']['image']
    # return {'recipes': recipes}