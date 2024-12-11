import { useEffect, useState } from 'react';
import axios from 'axios';
import { AccordionCollapse } from 'react-bootstrap';

function SpotifyGetTopSongs() {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'));
        }
    })

    const handleGetTopSongs = () => {
        axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0', {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(response => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className="read-button" onClick={handleGetTopSongs}>
                Read my aura!
            </div>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
        </>
    );
}

export default SpotifyGetTopSongs;

