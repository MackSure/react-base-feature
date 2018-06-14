import React from 'react';
import PropTypes from 'prop-types';
import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
// import Radium from 'radium';
import classes from './person.css';

class Person extends React.Component {

    constructor (props) {
        super(props);
        console.log('[Person.js] inside constructor!');
    }

    componentWillMount () {
        console.log('[Person.js] inside componentWillMount!');
    };

    componentDidMount () {
        console.log('[Person.js] inside componentDidMount!');
        if (this.props.position === 1) {
            this.inputElement.focus();
        }
    }

    render () {
        console.log('[Person.js] inside render!');
        return (
            <Aux>
                <p onClick={this.props.click}>I'm a Person and I'm {this.props.name}, and I'm {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input ref={(inp) => { this.inputElement = inp }} type="text" onChange={this.props.changed} value={this.props.name}/>
            </Aux>
        )
    }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

// export default Radium(person);
export default WithClass(Person, classes.Person);