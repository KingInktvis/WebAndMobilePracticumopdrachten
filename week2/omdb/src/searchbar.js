import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render () {
        return (
            <input value={this.props.movie}
            onChange={(item) => {

            }}/>
        );
    }
}

export default SearchBar