from flask import Flask, request
# from webSearchAPI import lookupRecipes
from pymongo import MongoClient
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
cluster = MongoClient(os.environ.get('dbURI'))

db = cluster["mydb"]

users = db["todos"]

@app.route('/get-recipe', methods=['GET'])
def getRecipe():
    return {"this": "works"}

@app.route('/login/', methods=['POST'])
def user_login_check():
    username = request.form.get('Username')
    password = request.form.get('Password')
    user = users.find_one({"username":username})
    if user is not None:
        if password == user['password']:
            return {"message" : "YAY"}
        else:
            return {"message": "Incorrect password"}
    else:
        return {"message": "Please create an account first"}

@app.route('/register/', methods=['POST'])
def user_register_check():
    username = request.form.get('Username')
    password = request.form.get('Password')
    Confpassword = request.form.get('ConfPassword')
    _id = users.count_documents({})+1
    if Confpassword != password:
        return "OPEN YOUR EYES"
    user = {
        '_id': _id,
        'username': username,
        'password': password,
        'treesSaved': 0
    }
    users.insert_one(user)
    return user

if __name__ == '__main__':
    app.run(debug=True)

