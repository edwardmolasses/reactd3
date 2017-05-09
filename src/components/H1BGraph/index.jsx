// ./src/components/H1BGraph/index.jsx
import React, { Component } from 'react';
import * as d3 from "d3";
import Histogram from '../Histogram';

class H1BGraph extends Component {
    constructor() {
        super();

        this.state = {
            rawData: []
        };
    }

    componentWillMount() {
        this.loadRawData();
    }

	cleanJobs(name) {
		return name;
	}

	loadRawData() {
		console.log(d3);
		let dateFormat = d3.timeParse("%m/%d/%Y");
        d3.csv(this.props.url)
          .row((d) => {
			if (!d['base salary']) {
				return null;
			}
			return {employer: d.employer,
					submit_date: dateFormat(d['submit date']),
					start_date: dateFormat(d['start date']),
					case_status: d['case status'],
					job_title: d['job title'],
					clean_job_title: this.cleanJobs(d['job title']),
					base_salary: Number(d['base salary']),
					salary_to: d['salary to'] ? Number(d['salary to']) : null,
					city: d.city,
					state: d.state};
          })
          .get((error, rows) => {
              if (error) {
                  console.error(error);
                  console.error(error.stack);
              } else {
                  this.setState({rawData: rows});
              }
          });
    }

    render() {
        if (!this.state.rawData.length) {
            return (
                <h2>Loading data</h2>
            );
        }
		let params = {
				bins: 20,
				width: 500,
				height: 500,
				axisMargin: 83,
				topMargin: 10,
				bottomMargin: 5,
				value: (d) => d.base_salary
			},
			fullWidth = 700;
        return (
            <div>
            	<svg width={fullWidth} height={params.height}>
                    <Histogram {...params} data={this.state.rawData} />
                </svg>
            </div>
        );
    }
}

export default H1BGraph;
