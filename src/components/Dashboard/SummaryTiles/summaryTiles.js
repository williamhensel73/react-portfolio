import './summaryTiles.scss'

// Magnitudes are null when there are no quakes to measure, so show a dash instead of NaN.
const formatMag = (value) => (value === null ? '—' : value.toFixed(1))

const SummaryTiles = ({ stats }) => {
    const tiles = [
        { label: 'Total quakes', value: stats.total },
        { label: 'Largest magnitude', value: formatMag(stats.maxMag) },
        { label: 'Average magnitude', value: formatMag(stats.avgMag) },
    ]

    return (
        <div className="summary-tiles">
            {tiles.map((tile) => (
                <div className="tile" key={tile.label}>
                    <span className="tile-value">{tile.value}</span>
                    <span className="tile-label">{tile.label}</span>
                </div>
            ))}
        </div>
    )
}

export default SummaryTiles
