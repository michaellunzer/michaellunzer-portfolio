"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SpotifyNowPlaying() {
    const [nowPlaying, setNowPlaying] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await fetch('/api/spotify/now-playing');
                const data = await response.json();
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setNowPlaying(data);
                }
            } catch (err) {
                setError('Failed to fetch now playing');
                console.error('Error fetching now playing:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNowPlaying();
        
        // Refresh every 30 seconds
        const interval = setInterval(fetchNowPlaying, 30000);
        
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="spotify__now-playing">
                <h2>Now Playing</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error || !nowPlaying || !nowPlaying.isPlaying) {
        return (
            <div className="spotify__now-playing">
                <h2>Now Playing</h2>
                <p>Not currently playing anything on Spotify</p>
            </div>
        );
    }

    return (
        <div className="spotify__now-playing">
            <h2>Now Playing</h2>
            <div className="spotify__now-playing-content">
                <div className="spotify__album-cover">
                    {nowPlaying.albumImageUrl && (
                        <Image
                            src={nowPlaying.albumImageUrl}
                            alt={nowPlaying.album}
                            width={200}
                            height={200}
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>
                <div className="spotify__track-info">
                    <h3>
                        <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer">
                            {nowPlaying.title}
                        </a>
                    </h3>
                    <p className="artist">{nowPlaying.artist}</p>
                    <p className="album">{nowPlaying.album}</p>
                </div>
            </div>
        </div>
    );
} 