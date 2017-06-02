// ./src/components/H1BGraph/Meta/Title.jsx
import React, { Component } from 'react';
import d3 from 'd3';

import Meta from './BaseComponent';
import StatesMap from './StatesMap';

class Title extends Meta {
    getYearsFragment() {
        let years = this.getYears(),
            title;

        if (years.length > 1) {
            title = "";
        } else {
            title = `in ${years[0]}`;
        }

        return title;
    }

    getUSStateFragment() {
        var states = this.getUSStates(),
            title;

        if (states.length > 1) {
            title = "";
        } else {
            title = `in ${StatesMap[states[0].toUpperCase()]}`;
        }

        return title;
    }

    render() {
        // let title = (<h2>This is a title</h2>);
        let mean = d3.mean(this.props.data, (d) => d.base_salary),
            format = this.getFormatter();
        let yearsFragment = this.getYearsFragment(),
            USstateFragment = this.getUSStateFragment(),
            title;

        if (yearsFragment && USstateFragment) {
            title = (
                <h2>{USstateFragment}, H1B workers in the software industry made ${format(mean)}/year {yearsFragment}</h2>
            );
        } else {
            title = (
                <h2>H1B workers in the software industry {yearsFragment.length ? "made" : "make"} ${format(mean)} / year {USstateFragment} {yearsFragment}</h2>
            );
        }

        return title;
    }
}

export default Title;
