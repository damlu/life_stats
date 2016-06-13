import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
//import c3 from 'c3';
//import d3 from 'd3';


class Graph extends React.Component {

    getLineData(factors) {
        let data = [];
        let keys = [];
        let dateMap = {};

        for (let factor of factors) {
            keys.push(factor.name);
            for (let log of factor.logs) {
                let dateString = log.dateTime.toLocaleFormat('%Y-%m-%d');

                let dateVal = dateMap[dateString];
                if (!dateVal) {
                    dateVal = dateMap[dateString] = {
                        date: dateString
                    };
                }

                dateVal[factor.name] = log.value;
            }
        }
        console.log(dateMap);
        let dates = Object.keys(dateMap).sort();

        dates.map((date) => {
            data.push(dateMap[date]);
        });

        return {data, keys};
    }
    //this.refs.panel
    componentDidMount() {
        //console.log(this.props);
        console.log(this.getLineData(this.props.factors));
        this.renderChart(this.getLineData(this.props.factors));
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(this.props);
        console.log(this.getLineData(nextProps.factors));
        this.renderChart(this.getLineData(nextProps.factors));
       // return false;
        return true;
    }

    renderChart({data, keys}) {
        const chart = c3.generate({
            bindto: '#chart',
            data: {
                json: data,
                keys: {
                    x: 'date',
                    value: keys
                }
            },
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
                            max: 6
                        }
                    },
                    height: 75
                }
            }
        });
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