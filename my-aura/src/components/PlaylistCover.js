import React from 'react';
import './PlaylistCover.css';

export default function PlaylistCover({ color1, color2, color3 }) {
    // const { color1, color2, color3 } = props;
    // console.log('HERE',color1)
    return (
        <div className="cover" style={{position: 'relative', height: '500px', width: '500px',background: `radial-gradient(farthest-corner at 240px 240px,${color1},${color2},${color3})`}}>
        </div>
    )
}

// `radial-gradient(farthest-corner at 240px 240px,${color1},${color2},${color3})`
// `${color1}`