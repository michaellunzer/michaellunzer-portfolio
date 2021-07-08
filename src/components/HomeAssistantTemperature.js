import React from 'react';
import axios from 'axios';

class HomeAssistantTemperature extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         HomeAssistantData: [],
    //         isLoading: true,
    //         errors: null
    //     };
    //     };
    
    state = {
        HomeAssistantData: [],
        HomeAssistantAttributes: [],
        isLoading: true,
        errors: null
    }


// source of this example: 
// https://css-tricks.com/using-data-in-react-with-the-fetch-api-and-axios/
// https://codepen.io/kinsomicrote/pen/xJGpLm

getData() {
    const requestOptions = {
        headers: {
        Authorization: // need to use env variables to hide this token!!!!!! Do this before pushing to github!!! it will be cycled on the server. just testing for 
        // process.env.HOME_ASSISTANT_TOKEN
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU'
        ,
        'Content-Type': 'application/json'
        }
    };

    axios
    .get('https://home.michaellunzer.com/api/states/sensor.sn1_temperature',
        requestOptions)
        // .then((response) => console.log(response))
        // .then(response => response.json())
        .then((response) => {
            this.setState({
              HomeAssistantData: response.data,
              isLoading: false
            })
            console.log(this.state.HomeAssistantData)
            ;
          })
        //   .then(console.log(this.state.HomeAssistantData))
          .catch(error => this.setState({ error, isLoading: false }));
      };

    
componentDidMount() {
    this.getData();
}


render() {
    const HomeAssistantData = 
    // {
    //     "object": {
    //       "name": "Pluralsight",
    //       "number": 1,
    //       "address": "India",
    //       "website": "https://www.pluralsight.com/"
    //     }
    // }
    this.state.HomeAssistantData ;

    const HomeAssistantAttributes = 
            this.state.HomeAssistantData.attributes
    
    
    
// HomeAssistantAttributes is not working right now, but it logs to the console!


    // this.state;
    return (
        // <React.Fragment>
        // <h2>Home Assistant Data</h2>
        console.log(HomeAssistantData.attributes),
        console.log(HomeAssistantAttributes),
        <div>
            {HomeAssistantData.state}
            {/* {HomeAssistantAttributes.friendly_name}  */}
            
            

            {/* {HomeAssistantData.attributes.unit_of_measurement} 
            {
            Object.keys(HomeAssistantData).map((key, i) => (
                <div key={i}>
                    <span>Key Name: {key}</span>
                    <span>Value: {HomeAssistantData.attributes[key]}</span>
                </div>
            ))}
             */}
                </div>  
                
            )
        
        
        }      
    }


         
            
//             // {/* // HomeAssistantData.map(data => {
//             // //     const { entity_id, friendly_name, state } = data;
//             // //     return (
//             // //     <div key={entity_id}>
//             // //         <h2>{friendly_name}</h2>
//             // //         <p>{state}</p>
//             // //         <hr />
//             // //     </div>
//             //     // );
//             // // })
//             // // ) : (
//             // // <p>Loading...</p>
//             // // )} */}



//             {/* {!isLoading ? (
//             HomeAssistantData.map(data => {
//                 const { entity_id, friendly_name, state } = data;
//                 return (
//                 <div key={entity_id}>
//                     <h2>{friendly_name}</h2>
//                     <p>{state}</p>
//                     <hr />
//                 </div>
//                 );
//             })
//             ) : (
//             <p>Loading...</p>
//             )} */}


// {/* 

//          </div>
// </React.Fragment>
//     );
//     }





            


export { HomeAssistantTemperature }; 