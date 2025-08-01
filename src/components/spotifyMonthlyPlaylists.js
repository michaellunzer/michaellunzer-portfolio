"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SpotifyMonthlyPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('/api/spotify/playlists');
                const data = await response.json();
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setPlaylists(data.playlists || []);
                }
            } catch (err) {
                setError('Failed to fetch playlists');
                console.error('Error fetching playlists:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    if (loading) {
        return (
            <div className="spotify__top-artists">
                <h1>My Spotify Monthly Playlists</h1>
                <p>Loading playlists...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="spotify__top-artists">
                <h1>My Spotify Monthly Playlists</h1>
                <p>Unable to load playlists at the moment. Please try again later.</p>
                <p className="text-muted">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            {playlists && playlists.length > 0 && (
                <div className="spotify__top-artists">
                    <h1>My Spotify Monthly Playlists</h1>
                    <p>
                        I make a monthly playlist to record the songs that I'm currently listening to. Kinda like a musical time capsule!
                        I've been doing this on Spotify off and on since 2014 (and before that using iTunes 😎). This list only shows the last ~50 months, so check out my Spotify profile to go further back.
                    </p>
                    <div className="spotify__list">
                        {playlists.map((playlist, index) =>
                            <div key={index} className="spotify__list-item d-flex">
                                <div className="spotify__album-cover">
                                    {playlist.image && (
                                        <Image
                                            src={playlist.image}
                                            alt={playlist.name}
                                            width={800}
                                            height={800}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <h3>
                                    <span className="spotify__list-item-number">{index + 1}</span>
                                    <a href={playlist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                                        {playlist.name}
                                    </a>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}