import './quakeTable.scss'

const formatTime = (ms) => new Date(ms).toLocaleString()

// A "controlled" table: it owns no state. The current filter values come in as props,
// and user input is reported back up through the on...Change callbacks.
const QuakeTable = ({ quakes, totalCount, minMag, onMinMagChange, sortBy, onSortByChange }) => {
    return (
        <div className="quake-table">
            <div className="table-controls">
                <label>
                    Min magnitude
                    <input
                        type="number"
                        step="0.5"
                        min="-1"
                        max="10"
                        placeholder="Any"
                        value={minMag}
                        onChange={(e) => onMinMagChange(e.target.value)}
                    />
                </label>
                <label>
                    Sort by
                    <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                        <option value="time">Newest first</option>
                        <option value="mag">Largest first</option>
                    </select>
                </label>
                <span className="row-count">
                    Showing {quakes.length} of {totalCount}
                </span>
            </div>

            <div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Magnitude</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quakes.map((quake) => (
                            <tr key={quake.id}>
                                <td>{quake.place}</td>
                                <td>{quake.mag.toFixed(1)}</td>
                                <td>{formatTime(quake.time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {quakes.length === 0 && <p className="empty">No quakes match this filter.</p>}
            </div>
        </div>
    )
}

export default QuakeTable
