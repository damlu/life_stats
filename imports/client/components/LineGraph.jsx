import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
import d3 from 'd3';
import rd3 from 'rd3';

const {
    AreaChart,
    BarChart,
    CandleStickChart,
    LineChart,
    PieChart,
    ScatterChart,
    Treemap,
} = rd3;


class LineGraph extends React.Component {

    getLineData(factors) {
        let result = [];

        for (let factor of factors) {
            let factorLine = {name:factor.name, values:[]};
            for (let log of factor.logs) {
                factorLine.values.push({x:log.date_time, y:log.value});
            }
            result.push(factorLine);
        }



        return result;
    }
    //this.refs.panel
    render() {
        const {dispatch, factors, factorDisplayList} = this.props;

        let lineData = [
            {
                name: 'series1',
                values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
                strokeWidth: 3,
                strokeDashArray: "5,5",
            },
            {
                name: 'series2',
                values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
            },
            {
                name: 'series3',
                values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
            }
        ];

        return (
            <div id="lineGraph">
                <LineChart
                    legend={true}
                    data={this.getLineData(factors)}
                    width='100%'
                    height={400}
                    viewBoxObject={{
                      x: 0,
                      y: 0,
                      width: 500,
                      height: 400
                    }}
                    yAxisLabel=""
                    xAxisLabel="Date"
                    domain={{x: [,], y: [,]}}
                    gridHorizontal={true}
                />
                {JSON.stringify(factors)}
                {JSON.stringify(factorDisplayList)}
            </div>
        )
    }
}


LineGraph.propTypes = {
    factors: PropTypes.array.isRequired
};


const mapStateToProps = (state) => {
    return {
        factorDisplayList: state.factorDisplayList
    };
};


const LineGraphContainer = createContainer(({factorDisplayList}) => {

    const factorSub = Meteor.subscribe('getFactors');

    let query = {};
    query._id = {$in: Object.keys(factorDisplayList)};

    return {
        factorDisplayList,
        factors: Factors.find(query).fetch() || []
    }
}, LineGraph);

export default connect(mapStateToProps)(LineGraphContainer);