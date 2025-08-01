"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SpotifyTopArtists() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const response = await fetch('/api/spotify/top-artists');
                const data = await response.json();
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setArtists(data.artists || []);
                }
            } catch (err) {
                setError('Failed to fetch top artists');
                console.error('Error fetching top artists:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopArtists();
    }, []);

    if (loading) {
        return (
            <div className="spotify__top-artists">
                <h1>My Spotify Top 20 Artists</h1>
                <p>Loading top artists...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="spotify__top-artists">
                <h1>My Spotify Top 20 Artists</h1>
                <p>Unable to load top artists at the moment. Please try again later.</p>
                <p className="text-muted">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            {artists && artists.length > 0 && (
                <div className="spotify__top-artists">
                    <h1>My Spotify Top 20 Artists</h1>
                    <p>
                        These are my top 20 artists from the past four weeks.
                    </p>
                    <div className="spotify__list">
                        {artists.map((artist, index) =>
                            <div key={index} className="spotify__list-item d-flex">
                                <div className="spotify__album-cover">
                                    {artist.image && (
                                        <Image
                                            src={artist.image}
                                            alt={artist.name}
                                            width={400}
                                            height={400}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <h3>
                                    <span className="spotify__list-item-number">{index + 1}</span>
                                    <a href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                                        {artist.name}
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