from googlesearch import search
from bs4 import BeautifulSoup
import requests

def lookupRecipes(search_string):
    # recipes = []
    # results = []
    # trees_saved = 0
    # search_query = (search_string + ' "vegetarian" site:allrecipes.com').lower()
    # if "chicken" in search_query:
    #     trees_saved = 7
    # elif ("beef" in search_query) or ("steak" in search_query) or ("burger" in search_query):
    #     trees_saved = 55
    # elif "goat" in search_query:
    #     trees_saved = 40
    # elif ("pork" in search_query) or ("ribs" in search_query):
    #     trees_saved = 20
    # for link in search(search_query, tld='com', lang='en', num=2, start=0, stop=2, pause=50):
    #     if '/recipe/' in link:
    #         result = requests.get(link)
    #         results.append(BeautifulSoup(result.text, "html.parser"))
  
    # for i, result in enumerate(results):
    #     rTitle = result.find(("h1"), {"class":"headline heading-content elementFont__display"}).text
    #     rImage = result.find(("div"), {"class":"inner-container js-inner-container image-overlay"}).find(("button"))['data-image']
    #     recipes.append({})
    #     recipes[i]["image"] = rImage
    #     recipes[i]["title"] = rTitle
    #     recipes[i]["ingredients"] = []
    #     recipes[i]["instructions"] = []
    #     for ingredient in result.find(("ul"),{"class":"ingredients-section"}).find_all(("li"), {"class":"ingredients-item"}):
    #         recipes[i]["ingredients"].append(ingredient.text.strip())
    #     for instruction in result.find(("ul"),{"class":"instructions-section"}).find_all("p"):
    #         recipes[i]["instructions"].append(instruction.text)
              
    # return{"recipes": recipes, "trees_saved": trees_saved}
    recipes = []
    search_query_url = "https://api2.bigoven.com/recipes?pg=1&rpp=25&title_kw=" + search_string + "&api_key=" + 