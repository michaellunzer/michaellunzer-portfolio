"use client";

import React from "react";
import Image from "next/image";

export default function SpotifyNowPlaying() {
    // Sample recent tracks data - in a real implementation, this could be fetched at build time
    const recentTracks = [
        {
            name: "Bohemian Rhapsody",
            artist: "Queen",
            album: "A Night at the Opera",
            albumCover: "https://i.scdn.co/image/ab67616d0000b273ce4f173303e6c1d9ac5f336a",
            spotifyUrl: "https://open.spotify.com/track/3z8h0TU7ReDPLIbEnYhWZb"
        },
        {
            name: "Hotel California",
            artist: "Eagles",
            album: "Hotel California",
            albumCover: "https://i.scdn.co/image/ab67616d0000b273ce4f173303e6c1d9ac5f336a",
            spotifyUrl: "https://open.spotify.com/track/40riOy7x9W7udXy6SA5vKc"
        },
        {
            name: "Stairway to Heaven",
            artist: "Led Zeppelin",
            album: "Led Zeppelin IV",
            albumCover: "https://i.scdn.co/image/ab67616d0000b273ce4f173303e6c1d9ac5f336a",
            spotifyUrl: "https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc"
        }
    ];

    const currentStatus = "Currently listening to classic rock while coding";

    return (
        <div className="spotify__now-playing">
            <h2>Now Playing</h2>
            
            <div className="spotify__now-playing-content">
                <div className="spotify__current-status">
                    <div className="spotify__status-indicator">
                        <div className="spotify__pulse"></div>
                        <span>Live</span>
                    </div>
                    <p className="spotify__status-text">{currentStatus}</p>
                </div>

                <div className="spotify__recent-tracks">
                    <h3>Recently Played</h3>
                    <div className="spotify__tracks-grid">
                        {recentTracks.map((track, index) => (
                            <div key={index} className="spotify__track-item">
                                <div className="spotify__album-cover">
                                    <Image
                                        src={track.albumCover}
                                        alt={`${track.album} album cover`}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="spotify__track-info">
                                    <h4>
                                        <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                            {track.name}
                                        </a>
                                    </h4>
                                    <p className="artist">{track.artist}</p>
                                    <p className="album">{track.album}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="spotify__actions">
                    <a 
                        href="https://open.spotify.com/user/michaellunzer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="spotify__profile-link"
                    >
                        <i className="fab fa-spotify"></i>
                        View My Spotify Profile
                    </a>
                    <p className="spotify__note">
                        Real-time listening data will be available soon!
                    </p>
                </div>
            </div>
        </div>
    );
} 