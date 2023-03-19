class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
      };
    }
  
    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        });
    }
  
    render() {
      const { items } = this.state;
      if (!isLoaded) {
        return <div>Loading ... </div>;
      } else {
        return (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        );
      }
    }
  }