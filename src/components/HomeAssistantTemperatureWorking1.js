import React from 'react';

class HomeAssistantTemperature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
            // ,
            // isLoaded: false
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
    const requestOptions = {
        headers: {
        Authorization: // need to use env variables to hide this token!!!!!! Do this before pushing to github!!! it will be cycled on the server. just testing for 
        // process.env.HOME_ASSISTANT_TOKEN
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU'
        ,
        'Content-Type': 'application/json'
        }
    };

    fetch(
        'https://home.michaellunzer.com/api/states/sensor.sn1_temperature',
        requestOptions
    )
        .then(response => response.json())
        // .then((data) => console.log(data))
        .then((resp) => {
            this.setState({data:resp})

        })
        // .then(result => this.setState({ 
            // isLoaded: true,
            // items: result.items
            // items: data.map(item => ({
            //     temperature: item.state,
            //     entity_id: item.entity_id,
            //     last_changed: item.last_changed
        //     }))
        // }));
        // }));
    // console.log(data[i])
    }


    

    render() {
        console.log('render method called');
        const data = this.state.data;
        console.warn(data)
        return (
            <div>
                <p>
                   Name: {data.entity_id}: {data.state}&deg; F
                    <br />
                   Last Updated: {data.last_updated}
                   <br />
                    
                </p>

                {/* <ul>
                    {data.map((item) => {
                        return <li key={item.entity_id}>
                            {item.state}
                        </li>
                    })}
                </ul> */}
            </div>
        )
        // const { items } = this.state;
        // if (!isLoaded) {
        //     return <div> Loading . . .</div>;
        // } else {
            // return (
            //     <ul>
            //     {items.map(item => (
            //       <li>
            //         <h1>{item.entity_id}</h1>
            //         <h3>{item.state}</h3>
            //         <p>{item.last_changed}</p>
            //       </li>
            //     ))}
            //   </ul>
            // );
            }
        }
    // }
        // const { unit_of_measurement } = this.unit_of_measurement; // check this
    //     return this.state.items.map(item => (
    //         <div>
    //            <li>
    //                { item.entity_id }
    //                {/* { item.state } */}
    //            </li>

    //         </div>
    //     ));
            
    //     }
    //     render() {
    //         return <ul>{this.renderItems()}</ul>
    //     }
    // }







            


export { HomeAssistantTemperature }; 