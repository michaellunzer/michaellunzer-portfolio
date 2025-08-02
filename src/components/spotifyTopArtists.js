"use client";

import React from "react";
import Image from "next/image";

export default function SpotifyTopArtists() {
    // Sample top artists data - in a real implementation, this could be fetched at build time
    const topArtists = [
        {
            name: "Queen",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d",
            followers: "45.2M"
        },
        {
            name: "Led Zeppelin",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp",
            followers: "38.7M"
        },
        {
            name: "Pink Floyd",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
            followers: "42.1M"
        },
        {
            name: "The Beatles",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
            followers: "52.8M"
        },
        {
            name: "David Bowie",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/0oSGxfWSnnOXhD2fKuz2Gy",
            followers: "28.3M"
        },
        {
            name: "The Rolling Stones",
            image: "https://i.scdn.co/image/ab6761610000e5ebc63aded6f5c4c1c3c2b3b3b3",
            spotifyUrl: "https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe",
            followers: "35.9M"
        }
    ];

    return (
        <div className="spotify__top-artists">
            <h2>My Top Artists</h2>
            <p className="spotify__description">
                These are some of my favorite artists that I listen to regularly. 
                My taste spans from classic rock to modern indie.
            </p>
            
            <div className="spotify__artists-grid">
                {topArtists.map((artist, index) => (
                    <div key={index} className="spotify__artist-item">
                        <div className="spotify__artist-image">
                            <Image
                                src={artist.image}
                                alt={`${artist.name} artist photo`}
                                width={120}
                                height={120}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="spotify__artist-rank">{index + 1}</div>
                        </div>
                        <div className="spotify__artist-info">
                            <h3>
                                <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                    {artist.name}
                                </a>
                            </h3>
                            <p className="spotify__artist-followers">{artist.followers} followers</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="spotify__section-footer">
                <a 
                    href="https://open.spotify.com/user/michaellunzer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="spotify__profile-link"
                >
                    <i className="fab fa-spotify"></i>
                    View My Full Spotify Profile
                </a>
            </div>
        </div>
    );
}