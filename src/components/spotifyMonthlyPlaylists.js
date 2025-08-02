"use client";

import React from "react";
import Image from "next/image";

export default function SpotifyMonthlyPlaylists({ monthlyPlaylists = [] }) {
    // If no playlists are provided, show a fallback message
    if (!monthlyPlaylists || monthlyPlaylists.length === 0) {
        return (
            <div className="spotify__monthly-playlists">
                <h2>Monthly Playlists</h2>
                <p className="spotify__description">
                    I make a monthly playlist to record the songs that I'm currently listening to. 
                    Kinda like a musical time capsule! I've been doing this on Spotify off and on since 2014 
                    (and before that using iTunes 😎).
                </p>
                
                <div className="spotify__no-playlists">
                    <p>Unable to load playlists at the moment. Please check back later!</p>
                </div>
                
                <div className="spotify__section-footer">
                    <a 
                        href="https://open.spotify.com/user/michaellunzer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="spotify__profile-link"
                    >
                        <i className="fab fa-spotify"></i>
                        View My Spotify Profile
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="spotify__monthly-playlists">
            <h2>Monthly Playlists</h2>
            <p className="spotify__description">
                I make a monthly playlist to record the songs that I'm currently listening to. 
                Kinda like a musical time capsule! I've been doing this on Spotify off and on since 2014 
                (and before that using iTunes 😎).
            </p>
            
            <div className="spotify__playlists-grid">
                {monthlyPlaylists.map((playlist, index) => (
                    <div key={playlist.id} className="spotify__playlist-item">
                        <div className="spotify__playlist-image">
                            <Image
                                src={playlist.images?.[0]?.url || '/images/spotify-placeholder.jpg'}
                                alt={`${playlist.name} playlist cover`}
                                width={200}
                                height={200}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="spotify__playlist-overlay">
                                <i className="fab fa-spotify"></i>
                            </div>
                        </div>
                        <div className="spotify__playlist-info">
                            <h3>
                                <a href={playlist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                                    {playlist.name}
                                </a>
                            </h3>
                            <p className="spotify__playlist-description">
                                {playlist.description || 'Monthly music collection'}
                            </p>
                            <p className="spotify__playlist-tracks">
                                {playlist.tracks?.total || 0} tracks
                            </p>
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
                    View All My Playlists
                </a>
                <p className="spotify__note">
                    New playlists are created monthly. Follow me on Spotify to get notified!
                </p>
            </div>
        </div>
    );
}