"use client";

import React from "react";
import Image from "next/image";

export default function SpotifyTopArtists({ data }) {
    return (
        <>
            {data && data.length > 0 && (
                <div className="spotify__top-artists">
                    <h1>My Spotify Top 20 Artists</h1>
                    <p>
                        These are my top 20 artists from the past four weeks.
                    </p>
                    <div className="spotify__list">
                        {data.map((artist, index) =>
                            <div key={index} className="spotify__list-item d-flex">
                                <div className="spotify__album-cover">
                                    {artist.fields.image && (
                                        <Image
                                            src={`https:${artist.fields.image.fields.file.url}`}
                                            alt={artist.fields.name}
                                            width={400}
                                            height={400}
                                        />
                                    )}
                                </div>
                                <h3>
                                    <span className="spotify__list-item-number">{index + 1}</span>
                                    <a href={artist.fields.external_urls?.spotify}>{artist.fields.name}</a>
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}