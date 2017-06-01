// ./src/components/H1BGraph/Meta/Title.jsx
import React, { Component } from 'react';
import d3 from 'd3';

import Meta from './BaseComponent';
import StatesMap from './StatesMap';

class Title extends Meta {
    render() {
        let title = (<h2>This is a title</h2>);


        return title;
    }
}

export default Title;
