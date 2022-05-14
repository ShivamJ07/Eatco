from flask import Flask, render_template, request, redirect, url_for

from pymongo import MongoClient

app = Flask(__name__)

cluster = MongoClient('mongodb+srv://ShivamJ:shivfury123@cluster0.wkskk.mongodb.net/mydb?retryWrites=true&w=majority')

db = cluster["mydb"]

users = db["todos"]

@app.route('/')
@app.route('/login/')
def user_login():
    return render_template('login.html')

@app.route('/login/', methods=['POST'])
def user_login_check():
    username = request.form.get('Username')
    password = request.form.get('Password')
    user = users.find_one({"username":username})
    if user is not None:
        if password == user['password']:
            return "YAY"
        else:
            return "Incorrect password"
    else:
        return "Please create an account first"

@app.route('/register/')
def user_register():
    return render_template('register.html')

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
        'password': password
    }
    users.insert_one(user)
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)

