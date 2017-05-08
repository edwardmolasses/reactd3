// ./src/components/Histogram/Histogram.jsx
import React, { Component } from 'react';
import * as d3 from "d3";

class Histogram extends Component {
	constructor(props) {
		super();

		this.histogram = d3.layout.histogram();
		this.widthScale = d3.scale.linear();
        this.yScale = d3.scale.linear();

        this.update_d3(props);
    }

    componentWillReceiveProps(newProps) {
        this.update_d3(newProps);
    }

    update_d3(props) {
    	this.histogram
            .bins(props.bins)
            .value(props.value);

        let bars = this.histogram(props.data),
            counts = bars.map((d) => d.y);
console.log(bars);
        this.widthScale
            .domain([d3.min(counts), d3.max(counts)])
            .range([9, props.width-props.axisMargin]);

        this.yScale
            .domain([0, d3.max(bars.map((d) => d.x+d.dx))])
            .range([0, props.height-props.topMargin-props.bottomMargin]);
	    }
    }

    render() {
        let translate = `translate(0, ${this.props.topMargin})`;

        return (
            <g className="histogram" transform={translate}>
            </g>
        );
    }
}

export default Histogram;
