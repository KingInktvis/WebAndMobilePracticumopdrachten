import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: ""}
    }

    render () {
        return (
            <input value={this.props.term}
            onChange={(event) => {this.handleValueChange(event.target.value)}} />
        );
    }

    handleValueChange(newValue){
        this.setState({term: newValue});
        this.props.onInputChange(newValue);
    }
}

export default SearchBar