import React, { Component } from 'react';


class App extends Component {

    constructor(){
        super();
        this.state = {
            first_name:'',
            last_name:'',
            dob:'',
            mobileNumber:'',
            countryResidence:'',
            email:'',
            character:"",
            characters:[],
            castMembers: [],
            _id: '',
            chooseCharacter: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCastMember = this.addCastMember.bind(this);
        this.fetchCharacters= this.fetchCharacters.bind(this);
        this.characterPicked= this.characterPicked.bind(this);
    }




    addCastMember(e) {
        if (this.state._id) {
            fetch(`api/cast_members/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: data.status});
                    this.setState({first_name:'', last_name:'', dob:'', mobileNumber:'', countryResidence:'', email:'', character: ''});
                    this.fetchCastMembers();

                });
        } else {
            fetch('/api/cast_members', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: data.status});
                    this.setState({first_name:'', last_name:'', dob:'', mobileNumber:'', countryResidence:'', email:'', character: ''});
                    this.fetchCastMembers();
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    };
    
    componentDidMount() {

        this.fetchCharacters();
        this.fetchCastMembers();
        }


    fetchCastMembers() {
        fetch('/api/cast_members')
            .then(res => res.json())
            .then(data => {
                this.setState({castMembers: data});
                console.log(this.state.castMembers);
            });
        fetch('https://swapi.co/api/people/')
            .then(res => res.json())
            .then(data => {
                let dataResults = data.results;
                this.setState({
                    characters: dataResults}
                );
                console.log(data.results);
            })
    }

    fetchCharacters() {
         fetch('https://swapi.co/api/people/')
            .then(res => res.json())
            .then(data => {
                    this.setState({
                    characters: data.results}
                    );
                console.log(data.results);
            })

    }


    
    deleteRecord(id) {
        if (confirm('Are you sure you want to delete this record?')){
            fetch(`api/cast_members/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Contestant deleted'});
                    this.fetchCastMembers();

                })
        }
    }

    editRecord(id){
        fetch(`api/cast_members/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    dob: data.dob,
                    mobileNumber: data.mobileNumber,
                    countryResidence: data.countryResidence,
                    email: data.email,
                    character: data.character,
                    _id: data._id
                })
            });
        }

    
    handleChange(e){
        const { name, value } =  e.target;
        this.setState({
            [name]: value,

        });


    }
    characterPicked(e){
       e.preventDefault;
        document.querySelector("select").value = e.target.value;

        this.setState({
            character: e.target.value
        });
    }


    render() {
        const characters= [];
        this.state.characters.map(e => characters.push(e.name));
        for (let i = 0;i<characters.length;i++){
            let options = document.createElement("option");
            options.value= characters[i];
            options.innerHTML= characters[i];
            let select = document.querySelector("select");
            console.log(select);
            select.appendChild(options);
        }

        return (
            <div>
                {/*NAVIGATION*/}
                <nav className={"teal lighten-1"}>
                    <div className={"container"}>
                        <a className={"brand-logo"} href="/">Star Wars Casting App</a>
                    </div>
                </nav>


                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col s4"}>
                            <div className={"card"}>
                                <div className={"card-content"}>
                                    <form onSubmit={this.addCastMember} action="">
                                        <div className={"row"}>
                                            {/*::FIRST NAME*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="first_name">First Name</label>
                                                <input name={"first_name"} onChange={this.handleChange} value={this.state.first_name} type="text" placeholder={"First Name"}/>
                                            </div>
                                            {/*::LAST NAME::*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="last_name">Last Name</label>
                                                <input name={"last_name"} onChange={this.handleChange} value={this.state.last_name} type="text" placeholder={"Last Name"}/>
                                            </div>
                                            {/*::DATE OF BIRTH::*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="dob">Date of Birth</label>
                                                <input  className={""} name={"dob"} onChange={this.handleChange} value={this.state.dob} type="date" placeholder={"DD/MM/YYYY"}/>
                                            </div>
                                            {/*::MOBILE NUMBER::*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="mobileNumber">Mobile Number</label>
                                                <input name={"mobileNumber"} onChange={this.handleChange} value={this.state.mobileNumber} type="text" placeholder={"Mobile Number"}/>
                                            </div>
                                            {/*::COUNTRY Residence::*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="countryResidence">Country of Residence</label>
                                                <input name={"countryResidence"} onChange={this.handleChange} value={this.state.countryResidence} type="text" placeholder={"Country of Residence"}/>
                                            </div>
                                            {/*::EMAIL::*/}
                                            <div className={"input-field col s12"}>
                                                <label htmlFor="email">Email</label>
                                                <input name={"email"} onChange={this.handleChange} value={this.state.email} type="text" placeholder={"Email"}/>
                                            </div>
                                            {/*::STAR WARS CHARACTER::*/}
                                            <div className={"col s12"}>
                                                <label htmlFor="character">Star Wars Character</label>
                                                <select  name={"character"} className={"browser-default"} onClick={this.characterPicked}  placeholder={"Select your character"}>
                                                </select>
                                            </div>
                                        </div>
                                        <button type={"submit"} className={"btn teal lighten-1"} onClick={this.addCastMember}>
                                            REGISTER
                                        </button>


                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className={"col s8"}>
                            <table>
                                <thead>
                                <tr>
                                    <th className={"tableText"}>CONTESTANT'S INFO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.castMembers.map(castMembers => {
                                        return (
                                            <tr key={castMembers._id}>
                                                <td>{`${castMembers.first_name} ${castMembers.last_name} | ${castMembers.dob} | ${castMembers.mobileNumber} | ${castMembers.countryResidence} | ${castMembers.email} | ${castMembers.character}`}</td>
                                                <td>
                                                    <button className={"btn teal lighten-1"} onClick={() => this.editRecord(castMembers._id)} style={{margin: '4px'}}>
                                                        <i className={"material-icons"}>edit</i>
                                                    </button>
                                                    <button className={"btn teal lighten-1"} onClick={() => this.deleteRecord(castMembers._id)} style={{margin: '4px'}}>
                                                        <i className={"material-icons"}>delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}



export default  App;
