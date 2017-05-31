// ./src/components/Histogram/Axis.jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

class Axis extends Component {
    constructor(props) {
        super();

        this.yScale = d3.scale.linear();
        this.axis = d3.svg.axis()
                      .scale(this.yScale)
                      .orient("left")
                      .tickFormat((d) => "$" + this.yScale.tickFormat()(d));

        this.update_d3(props);
    }

    componentWillReceiveProps(newProps) {
        this.update_d3(newProps);
    }

	componentDidUpdate() { this.renderAxis(); }

	componentDidMount() { this.renderAxis(); }

	renderAxis() {
		let node = ReactDOM.findDOMNode(this);
		d3.select(node).call(this.axis);
	}

    update_d3(props) {
        console.log('%c[Axis.jsx:33]\nprops.topMargin \n(see below): ','font-size:25px;color:thistle;'); console.log(props.topMargin);
        console.log('%c[Axis.jsx:34]\nprops.bottomMargin \n(see below): ','font-size:25px;color:yellowgreen;'); console.log(props.bottomMargin);
        console.log('%c[Axis.jsx:35]\nprops.data.length \n(see below): ','font-size:25px;color:teal;'); console.log(props.data.length);
		this.yScale
			.domain([0, d3.max(props.data.map((d) => d.x + d.dx))])
			.range([0, props.height - props.topMargin - props.bottomMargin]);

		this.axis
			.ticks(props.data.length)
			.tickValues(props.data.map((d) => d.x).concat(props.data[props.data.length - 1].x + props.data[props.data.length - 1].dx));
    }

    render() {
        let translate = `translate(${this.props.axisMargin - 3}, 0)`;
        return (
            <g className="axis" transform={translate}>
            </g>
        );
    }
}

export default Axis;