import { useEffect } from 'react';
import './App.css';
import SpotifyGetTopSongs from './components/SpotifyGetTopSongs';

// https://accounts.spotify.com/authorize?client_id=365d88b9a3a44347915dee1cd159d822&redirect_uri=http:%2F&2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123

const CLIENT_ID = "365d88b9a3a44347915dee1cd159d822";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join("%20");

const getReturnParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split('&');
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split('=');
    accumulater[key] = value;
    return accumulater
  }, {});
  return paramsSplitUp;
}

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const {access_token, expires_in, token_type,} = getReturnParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('expiresIn', expires_in)
    }
  })
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }
  return (
    <div className="App">
      <div className='app-body'>
        <div className='title'>Spotify Aura Reader</div>
        <div className='description'>I can read your ✨aura✨... based on your current Spotify rotation. Give me all your data:</div>
        <div className='login-button' onClick={handleLogin}>Log in to Spotify.</div>
        <SpotifyGetTopSongs></SpotifyGetTopSongs>
      </div>
    </div>
  );
}

export default App;

