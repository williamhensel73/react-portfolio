import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import './magnitudeChart.scss'

const AXIS_TEXT = { fill: '#555', fontSize: 12, fontFamily: 'Poppins' }

// buckets: [{ range: '2–3', count: 41 }, ...] from bucketByMagnitude()
const MagnitudeChart = ({ buckets }) => {
    return (
        <div className="magnitude-chart">
            <h2>Quakes by magnitude</h2>
            {/* ResponsiveContainer measures its parent, so the chart resizes with the page */}
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={buckets} margin={{ top: 24, right: 8, bottom: 0, left: -16 }}>
                    <CartesianGrid vertical={false} stroke="#e6e6e6" />
                    <XAxis dataKey="range" tick={AXIS_TEXT} tickLine={false} axisLine={{ stroke: '#ccc' }} />
                    <YAxis allowDecimals={false} tick={AXIS_TEXT} tickLine={false} axisLine={false} />
                    <Tooltip
                        cursor={{ fill: 'rgba(32, 51, 84, 0.06)' }}
                        formatter={(value) => [value, 'Quakes']}
                        labelFormatter={(range) => `Magnitude ${range}`}
                    />
                    <Bar dataKey="count" fill="#203354" maxBarSize={24} radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="count" position="top" style={AXIS_TEXT} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MagnitudeChart
