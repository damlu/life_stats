import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
//import c3 from 'c3';
//import d3 from 'd3';

let chart;

class Graph extends React.Component {

    getLineData(factors) {
        let data = [];
        let keys = [];
        let dateMap = {};

        for (let factor of factors) {
            keys.push(factor.name);
            for (let log of factor.logs) {
                let dateString = log.dateTime.toLocaleDateString();

                let dateVal = dateMap[dateString];
                if (!dateVal) {
                    dateVal = dateMap[dateString] = {
                        date: log.dateTime
                    };
                }

                dateVal[factor.name] = log.value;
            }
        }

        let dates = Object.keys(dateMap).sort();

        dates.map((date) => {
            data.push(dateMap[date]);
        });

        return {data, keys};
    }

    renderChart({data, keys}) {
        chart = c3.generate({
            data: {
                json: data,
                keys: {
                    x: 'date',
                    value: keys
                }
            },
            bindto: '#chart',
            axis: {
                x: {
                    label: {
                        text: 'Date'
                    },
                    type: 'timeseries',
                    localtime: true,
                    tick: {
                        fit: true,
                        format: '%Y-%m-%d',
                        rotate: -40,
                        culling: {
                            max: 10
                        }
                    },
                    height: 75
                },
                y: {
                    tick: {
                        format: d3.format('.2f')
                    }
                }
            }
        });
    }

    updateChart({data, keys}) {
        chart.load({
            json: data,
            keys: {
                x: 'date',
                value: keys
            },
            unload: true
        });
    }

    componentDidMount() {

        console.log(this.getLineData(this.props.factors));
        this.renderChart(this.getLineData(this.props.factors));
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props.factors, nextProps.factors);
        this.updateChart(this.getLineData(nextProps.factors));

        return false;
    }

    render() {
        const {dispatch, factors, factorDisplayList} = this.props;

        return (
            <div id='chart-container'>
                {/*JSON.stringify(factors)*/}
                {/*JSON.stringify(factorDisplayList)*/}
                <div id="chart"></div>
            </div>

        )
    }
}


Graph.propTypes = {
    factors: PropTypes.array.isRequired
};


const mapStateToProps = (state) => {
    return {
        factorDisplayList: state.factorDisplayList
    };
};


const GraphContainer = createContainer(({factorDisplayList}) => {

    const factorSub = Meteor.subscribe('getFactors');

    let query = {};
    query._id = {$in: Object.keys(factorDisplayList)};

    return {
        factorDisplayList,
        factors: Factors.find(query).fetch() || []
    }
}, Graph);

export default connect(mapStateToProps)(GraphContainer);