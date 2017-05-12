import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './searchbar'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { term: 'ok'}
    }

    render() {
        return (
          <div>
              <SearchBar onInputChange={(term) => this.setState({term})} />
          </div>
        );
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
