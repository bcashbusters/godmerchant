import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
import * as Recharts from 'recharts';

import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
//import dataList from './offerDataSampling';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});
class OfferPerformance extends React.Component {
    constructor(){
        super();
        this.defaultData = [
            {name: 'Week 1', Users: 1000, Sales: 2000, amt: 2400},
            {name: 'Week 2', Users: 3000, Sales: 4008, amt: 2210},
            {name: 'Week 3', Users: 4500, Sales: 5000, amt: 2290},
            {name: 'Week 4', Users: 6000, Sales: 7000, amt: 2000},
            {name: 'Week 5', Users: 5000, Sales: 4800, amt: 2181},
            {name: 'Week 6', Users: 7000, Sales: 8000, amt: 2500},
            {name: 'Week 7', Users: 8000, Sales: 9000, amt: 2100},
        ];
        this.state = {
            data : this.defaultData,
            slider: {
                value: 200
            }
        }
    }

    calculateNewData(sliderValue){
        const newData = [
            {name: 'Week 1', Users: 1000, Sales: 2000, amt: 2400},
            {name: 'Week 2', Users: 3000, Sales: 4008, amt: 2210},
            {name: 'Week 3', Users: 4500, Sales: 5000, amt: 2290},
            {name: 'Week 4', Users: 6000, Sales: 7000, amt: 2000},
            {name: 'Week 5', Users: 5000, Sales: 4800, amt: 2181},
            {name: 'Week 6', Users: 7000, Sales: 8000, amt: 2500},
            {name: 'Week 7', Users: 8000, Sales: 9000, amt: 2100},
        ]
        const changeFactor = sliderValue/10 + 1;
        for(let key in newData){
            let curr = newData[key];
            curr.Users = curr.Users*changeFactor;
            curr.Sales = curr.Sales*changeFactor;
        }

        return Object.keys(newData).map(key => newData[key]);
    }

    handleChangeValue(value){
        const slVal = Math.ceil(1000/value/2);
        const changedData =  this.calculateNewData(slVal);
        this.setState({
            data: changedData,
            slider: {
                value: value
            }
        });
    }

    handle(props) {
        const Handle = Slider.Handle;
        const { value, dragging, index, ...restProps } = props;

        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    }


    render() {

        return (
            <div>
                <Card>
                    <CardContent>
                        <div style={{width: '100%'}}>
                            <Typography type="headline" component="h2" style={{color: '#999'}}>
                                Plan Your Investment
                            </Typography>
                            <br/>
                            <br/>
                        </div>
                        <div style={{width: '600px', margin: 'auto'}}>
                        <Slider min={0} max={1000} defaultValue={200} handle={this.handle} onChange={(value)=>{this.handleChangeValue(value)}}/>
                        </div>
                        <Typography type="body1" component="h2">
                            Invest: <strong>${this.state.slider.value}k</strong>
                        </Typography>
                        <br/>
                        <br/>

                        <Typography type="body1" component="h2">
                            Weekly User engagement and Sales analysis
                        </Typography>
                        <br/>
                        <br/>
                        <LineChart width={600} height={300} data={this.state.data}
                                   margin={{top: 5, bottom: 5}}
                                   style={{margin: 'auto'}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Recharts.Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="Sales" stroke="#2196f3" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="Users" stroke="#ff4081"/>
                        </LineChart>


                    </CardContent>
                    <Divider/>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(OfferPerformance);