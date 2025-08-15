"use client";

import React, { useState, useEffect } from 'react';

export function HomeAssistantTemperature() {
    const [homeAssistantData, setHomeAssistantData] = useState(null);

    useEffect(() => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOME_ASSISTANT_TOKEN}`,
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
                Current temperature in my room: {homeAssistantData ? Number(homeAssistantData).toFixed(1) : '--'}&deg; F
            </div>
        </div>
    );
} 