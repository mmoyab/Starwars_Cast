import React, { Component } from 'react';


class Dropdown extends Component {
    state = {
        character: {}
    };
    componentDidMount() {
        fetch('https://swapi.co/api/people/')
            .then(res => res.json())
            .then(data => {
                let dataResults = data.results;
                this.setState({
                    character: dataResults}
                );
                console.log(data.results);
            })
    }

    render() {
        return (
            <select name={"character"} value={this.state.character} type="text" placeholder={"SW character"}>
                { this.state.character.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
        )}
}



export default Dropdown;