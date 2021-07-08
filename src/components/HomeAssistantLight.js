import React from 'react';
import axios from 'axios';

class HomeAssistantLight extends React.Component {


constructor(props) {
    super(props);
    this.postData = this.postData.bind(this);
    }



postData() {


// Send a POST request
axios({
    method: 'post',
    url: 'https://home.michaellunzer.com/api/services/light/turn_on', //turn_on // turn_off // toggle
    data: {
      entity_id: 'light.sn1_light',
    //   rgb_color: [0, 255, 0]
      color_name: 'blue' // for testing purposes.
    },
    headers: {
        Authorization: // need to use env variables to hide this token!!!!!! Do this before pushing to github!!! it will be cycled on the server. just testing for 
        // process.env.HOME_ASSISTANT_TOKEN
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NWY5ODI2YTFhYzU0ZmIwOTlmYzg5MjNkNGYyYzUxZiIsImlhdCI6MTYyNDY1NDI4MiwiZXhwIjoxOTQwMDE0MjgyfQ.fQLypZBR8ju5KV8shkakoL94Oa4WR1er6ZTK5ASv1nU'
        ,
        'Content-Type': 'application/json'
        }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });;

}



render() {
    return (
        <div>
            <button onClick={this.postData}>Toggle LED</button>
        </div>      
            )
        }      
    }


  

export { HomeAssistantLight }; 