import { useEffect, useState } from 'react';
import axios from 'axios';
import { AccordionCollapse } from 'react-bootstrap';
import PlaylistCover from './PlaylistCover';
import 'openai';

const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  dangerouslyAllowBrowser: true,
});

function SpotifyGetTopSongs() {
  const [token, setToken] = useState('');
  const [data, setData] = useState({});
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'));
    }
  }, []);

  const handleGetTopSongs = () => {
    axios
      .get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0', {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        const ts = response.data.items.map((item) => item.name);
        setTopSongs(ts);
      })
      .catch((error) => {
        console.error(error);
      });

    async function getColors() {
      if (topSongs.length === 0) return;

      const aiPrompt = `
      From these songs: ${topSongs}, generate three colors that these songs evoke. 
      The response should be in a valid JSON format, structured as:
      {
        "color1": "#RRGGBB",
        "color2": "#RRGGBB",
        "color3": "#RRGGBB"
      }
      Ensure that the colors are represented as valid hex color codes and look good together to convey the vibe of the songs.
      `;

      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: aiPrompt,
        temperature: 0,
        max_tokens: 1000,
      });

    //   const colorsArr = completion.choices[0].text;
    //   console.log(colorsArr)
    //   setColor1(colorsArr[0]);
    //   setColor2(colorsArr[1]);
    //   setColor3(colorsArr[2]);
    // console.log(completion.choices[0].text)
    const colors = JSON.parse(completion.choices[0].text.trim());

    setColor1(colors.color1);
    setColor2(colors.color2);
    setColor3(colors.color3);
    
    }
    getColors();
  };

//   useEffect(() => {
//     // Log or trigger actions when colors are updated
//     if (color1 && color2 && color3) {
//         // console.log(color1)
//       console.log('Colors updated:', color1, color2, color3);
//     }
//   }, [color1, color2, color3]);

  return (
    <>
      <div className="read-button" onClick={handleGetTopSongs}>
        Read my aura!
      </div>
      {data?.items ? data.items.map((item, index) => <p key={index}>{item.name}</p>) : null}
      {data?.items && color1 && color2 && color3 ? (
        <PlaylistCover color1={color1} color2={color2} color3={color3}></PlaylistCover>
      ) : null}
    </>
  );
}

export default SpotifyGetTopSongs;

