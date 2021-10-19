import styles from './MoistureChart.module.css'
import Plot from 'react-plotly.js'
const MoistureChart = (props) =>{
    var time=props.moistureLog.map(log=>{return log.time});
    var value=props.moistureLog.map(log=>{return log.value});

    return(
        <div className={styles.chart_container}>
            <div className={styles.header}>
                <h2>Moisture Graph</h2>
            </div>
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
                layout={{
                    autosize: true,
                    width: 335,
                    height: 250
                }}
            >

            </Plot>
        </div>
    )
}

export default MoistureChart;