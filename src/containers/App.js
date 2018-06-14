import React, {Component} from 'react';
import WithClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {
    constructor (props) {
        super(props);
        console.log('[App.js] inside constructor!');
        this.state = {
            persons: [
                {id: 1, name: 'Max', age: 28},
                {id: 12, name: 'Manu', age: 22},
                {id: 123, name: 'Stephanie', age: 25}
            ],
            showPersons: false,
            toggleClicked: 0
        };
    }

    componentWillMount () {
      console.log('[App.js] inside componentWillMount!');
    };

    componentDidMount () {
        console.log('[App.js] inside componentDidMount!');
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('[UPDATE App.js] inside shouldComponentUpdate!',nextProps, nextState);
        return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
    }

    componentWillUpdate (nextProps, nextState) {
        console.log('[UPDATE App.js] inside componentWillUpdate!', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[UPDATE App.js] inside componentDidUpdate!');
    }


    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice(); // ES5
        const persons = [...this.state.persons];  // ES6
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });
        console.log(personIndex);
        const person = {...this.state.persons[personIndex]};
        // const person = Object.assign({}, this.state.persons[personIndex]); // same above
        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState({
            persons: persons
        })
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;

        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        })
    };

    render() {
        console.log('[App.js] inside render!');
        let persons = null;
        if (this.state.showPersons) {
            persons = (<div>
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                />
            </div>);
        }

        return (
                <Aux>
                    <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
                    <div>{this.state.toggleClicked}</div>
                   <Cockpit
                       appTitle={this.props.title}
                       persons={this.state.persons}
                       showPersons={this.state.showPersons}
                       clicked={this.togglePersonsHandler}
                   />
                    {persons}
                </Aux>
        )
    }
}

export default WithClass(App, classes.App);
