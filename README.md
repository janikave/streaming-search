## Streaming Search - search for your favorite tracks from streaming services.

A React Native project that allows you to search tracks from Spotify and Deezer. A school project for mobile programming course at Haaga-Helia. 


## Setup

After cloning this repository, you need to do following steps to get the app working.
First you need to make Spotify's API work with creating an app that lets you make a token for using the search.

**If you don't want or can't create an app with Spotify Web API, you can still use Deezer to search music**


### To get the search from Spotify Web API to work 
*Skip this part if you don't want to use Spotify for searching music*.

1. Go to [Spotify Web API homepage](https://developer.spotify.com/documentation/web-api).
2. Sign in or create a new account.
3. Create a new app from your Dashboard.
4. Your newly created app has client ID and client secret. **Keep these confidential only to yourself.**

5. There is an example file of .env named **.env.example**. Copy the file and create a new **.env** -file for yourself. This file will be automatically on .gitignore.
6.  Add your client ID and secret there as shown below:

```
SPOTIFY_CLIENT_ID=CLIENT_ID_HERE
SPOTIFY_CLIENT_SECRET_CLIENT_SECRET_HERE
```

With these steps, the search functionality should work on Spotify as well.


### Next steps after setting up Spotify API

1. Install npm: ```npm install```
2. Install Expo: ´´´npx expo```
3. Install Expo Go on your phone, it will work as a platform for the app.
4. Start the app with ```npx expo start``` and scan the QR-code with your mobilephone.
