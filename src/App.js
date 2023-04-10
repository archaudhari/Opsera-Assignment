import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      searchInput: ""
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          items: response.results,
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: true
        });
      });
  }

  handleSearchInput = (e) => {
    this.setState({
      searchInput: e.target.value
    });
  };

  render() {
    const { items, loading, searchInput } = this.state;

    let filteredItems = items.filter(
      (item) =>
        item.location.city.toLowerCase().indexOf(searchInput.toLowerCase()) !==
        -1
    );

    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <input
            type="text"
            placeholder="Search City..."
            value={searchInput}
            onChange={this.handleSearchInput}
          />
          {filteredItems.map((item) => (
            <div key={item.login.uuid}>
              <img src={item.picture.medium} alt={item.name.first} />
              <h3>{item.name.first + " " + item.name.last}</h3>
              <p>{item.location.city}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default App;
