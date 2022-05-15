import requests

requests.post("http://localhost:5000/register/", data = {"Username": "hello", "Password": "thisworks", "ConfPassword": "thisworks"})
print(requests.post("http://localhost:5000/login/", data = {"Username": "hello", "Password": "thisworks"}).text)