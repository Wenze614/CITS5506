import styles from './MoistureChart.module.css'
import Plot from 'react-plotly.js'
const MoistureChart = (props) =>{
    var time=props.wateringLog.map(log=>{return log.time});
    var value=props.wateringLog.map(log=>{return log.value});

    return(
        <div className={styles.chart_container}>
            <Plot
                data={[
                    {
                        x:time,
                        y:value,
                        type:'scattergl',
                        marker:{color:'#74c69d'},
                        name:'moisture'
                    }
                ]}
            >

            </Plot>
        </div>
    )
}

export default MoistureChart;