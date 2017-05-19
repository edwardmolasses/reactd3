// ./components/H1BGraph/Controls/index.jsx
import React, { Component } from 'react';
import _ from 'lodash';
import ControlRow from './ControlRow';

class Controls extends Component {
	constructor() {
		super();

		this.state = {
			yearFilter: () => true,
			year: '*',
		};
	}

    updateYearFilter(year, reset) {
        let filter = (d) => d.submit_date.getFullYear() == year;

        if (reset || !year) {
            filter = () => true;
            year = '*';
        }

        this.setState({
            yearFilter: filter,
            year: year
        });
    }

    render() {
		let getYears = (data) => {
			return _.keys(_.groupBy(data, (d) => d.submit_date.getFullYear()))
					.map(Number);
		}
        return (
            <div>
				<ControlRow data={this.props.data}
							getToggleNames={getYears}
							updateDataFilter={::this.updateYearFilter} />
            </div>
        )
    }
}

export default Controls;