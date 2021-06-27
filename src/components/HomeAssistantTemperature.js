import React from 'react';

class HomeAssistantTemperature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            HomeAssistantData: null
        };
    }

    // componentDidMount() {
    //     // GET request using fetch with set headers
    //     const headers = {
    //     Authorization:
    //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU',
    //     'Content-Type': 'application/json'}
    //     fetch('https://home.michaellunzer.com/api/states/sensor.sn1_temperature', { headers })
    //         .then(response => response.json())
    //         .then(data => this.setState({ totalReactPackages: data.state }));
    // }


componentDidMount() {
    // GET request using fetch with set headers
    const requestOptions = {
        // method: 'GET',    // not needed
        // mode: 'no-cors',  // this didn't help!
        // credentials: 'same-origin',
        headers: {
        Authorization: // need to use env variables to hide this token!!!!!! Do this before pushing to github!!!
        process.env.HOME_ASSISTANT_TOKEN,
        'Content-Type': 'application/json'
        }
    };

    fetch(
        'https://home.michaellunzer.com/api/states/sensor.sn1_temperature',
        requestOptions
    )
        .then(response => response.json())
        .then(data => this.setState({ HomeAssistantData: data.state }
            // ,
            // console.log(this.state.currentTemp), console.log(this.state.unit_of_measurement)
            )
        // .then(data => this.setState({ unit_of_measurement: data.unit_of_measurement })
        // )
        );
    }

    render() {
        const { HomeAssistantData } = this.state;
        // const { unit_of_measurement } = this.unit_of_measurement; // check this
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Data is from my Home-Assistant Server</h5>
                <div className="card-body">
                    Current temperature in my room: { HomeAssistantData }&deg; F
                </div>
            </div>
        );
    }
}

export { HomeAssistantTemperature }; 