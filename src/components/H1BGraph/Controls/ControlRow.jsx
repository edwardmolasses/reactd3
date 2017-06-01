// ./src/components/H1BGraph/Controls/ControlRow.jsx
import React, { Component } from 'react';
import _ from 'lodash';
import Toggle from './Toggle';

class ControlRow extends Component {
	_addToggle(name) {
		let key = `toggle-${name}`,
			label = name;

		if (this.props.capitalize) {
			label = label.toUpperCase();
		}

		return (
			<Toggle label={label}
					name={name}
					key={key}
					value={this.state.toggleValues[name]}
					onClick={::this.makePick} />
		);
	}

	makePick(picked, newState) {
		let toggleValues = this.state.toggleValues;

		toggleValues = _.mapValues(
			toggleValues,
			(value, key) => newState && key == picked
		);

		// if newState is false, we want to reset
		this.props.updateDataFilter(picked, !newState);
		this.setState({toggleValues: toggleValues});
	}

	componentWillMount() {
		let toggles = this.props.getToggleNames(this.props.data).filter(function(val) {
			return val !== '';
		}),
		toggleValues = _.zipObject(toggles, toggles.map(() => false));

		this.state = {toggleValues: toggleValues};
	}

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
					{this.props
						.getToggleNames(this.props.data)
						.map((name) => this._addToggle(name))}
                </div>
            </div>
        );
    }
}

export default ControlRow;
