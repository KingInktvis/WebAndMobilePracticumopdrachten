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
                this.props.movie = item.value;
            }}/>
        );
    }
}

export default SearchBar