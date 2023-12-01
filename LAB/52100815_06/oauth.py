import os
import webbrowser
import requests
from urllib.parse import parse_qs

# Get GitHub client ID and client secret from environment variables
CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
print(CLIENT_ID)
print(CLIENT_SECRET)
if CLIENT_ID is None or CLIENT_SECRET is None:
    raise ValueError("GitHub client ID and client secret not found in environment variables.")

AUTH_ENDPOINT = f"https://github.com/login/oauth/authorize?response_type=code&client_id={CLIENT_ID}"
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"

# Open a web browser for user authentication
webbrowser.open(AUTH_ENDPOINT, new=2)
print(f"If the web browser does not open, please use this authorization URL: {AUTH_ENDPOINT}")

# Get the authorization code from the user
auth_code = input("Enter the authorization code: ")

# Exchange the authorization code for an access token
response = requests.post(TOKEN_ENDPOINT, data={
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'code': auth_code,
})
data = parse_qs(response.text)
access_token = data['access_token'][0]

# Use the access token to fetch the user's data
user_data = requests.get(USER_ENDPOINT, headers={"Authorization": f"token {access_token}"})
if user_data.status_code == 200:
    user_json = user_data.json()
    username = user_json["login"]
    name = user_json["name"]
    email = user_json["email"]
    followers = user_json["followers"]
    following = user_json["following"]

    print(f"GitHub Username: {username}")
    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Followers: {followers}")
    print(f"Following: {following}")
else:
    print("Failed to fetch user data. Please check your access token.")
