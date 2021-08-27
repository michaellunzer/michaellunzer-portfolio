// // this works and is showing the total react packages

// import React from 'react';

// class GetRequestSetHeaders extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             totalReactPackages: null
//         };
//     }

//     componentDidMount() {
//         // GET request using fetch with set headers
//         const headers = { 'Content-Type': 'application/json' }
//         fetch('https://api.npms.io/v2/search?q=react', { headers })
//             .then(response => response.json())
//             .then(data => this.setState({ totalReactPackages: data.total }));
//     }

//     render() {
//         const { totalReactPackages } = this.state;
//         return (
//             <div className="card text-center m-3">
//                 <h5 className="card-header">GET Request with Set Headers</h5>
//                 <div className="card-body">
//                     Total react packages: {totalReactPackages}
//                 </div>
//             </div>
//         );
//     }
// }

// export { GetRequestSetHeaders }; 































