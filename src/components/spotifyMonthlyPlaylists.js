"use client";

import React from "react";
import Image from "next/image";

export default function SpotifyMonthlyPlaylists({ data }) {
    return (
        <>
            {data && data.length > 0 && (
                <div className="spotify__top-artists">
                    <h1>My Spotify Monthly Playlists</h1>
                    <p>
                        I make a monthly playlist to record the songs that I'm currently listening to. Kinda like a musical time capsule!
                        I've been doing this on Spotify off and on since 2014 (and before that using iTunes 😎). This list only shows the last ~50 months, so check out my Spotify profile to go further back.
                    </p>
                    <div className="spotify__list">
                        {data.map((playlist, index) =>
                            <div key={index} className="spotify__list-item d-flex">
                                <div className="spotify__album-cover">
                                    {playlist.fields.image && (
                                        <Image
                                            src={`https:${playlist.fields.image.fields.file.url}`}
                                            alt={playlist.fields.name}
                                            width={800}
                                            height={800}
                                        />
                                    )}
                                </div>
                                <h3>
                                    <span className="spotify__list-item-number">{index + 1}</span>
                                    <a href={playlist.fields.external_urls?.spotify}>{playlist.fields.name}</a>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}