"use client";

import React, { useState, useEffect } from 'react';

export function HomeAssistantTemperature() {
    const [homeAssistantData, setHomeAssistantData] = useState(null);

    useEffect(() => {
        const requestOptions = {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_HOME_ASSISTANT_TOKEN || 
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU',
                'Content-Type': 'application/json'
            }
        };

        fetch(
            'https://home.michaellunzer.com/api/states/sensor.sniffer1_temperature',
            requestOptions
        )
            .then(response => response.json())
            .then(data => setHomeAssistantData(data.state))
            .catch(error => console.error('Error fetching temperature:', error));
    }, []);

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">Data is from my Home-Assistant Server</h5>
            <div className="card-body">
                Current temperature in my room: {homeAssistantData}&deg; F
            </div>
        </div>
    );
} 