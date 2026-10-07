import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters/animatedLetters'
import useEarthquakes from './useEarthquakes'
import { toQuakes, getStats, bucketByMagnitude, filterAndSort } from './quakeUtils'
import SummaryTiles from './SummaryTiles/summaryTiles'
import MagnitudeChart from './MagnitudeChart/magnitudeChart'
import QuakeTable from './QuakeTable/quakeTable'
import './index.scss'

const Dashboard = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const { data, error, refetch } = useEarthquakes()

    // Filter state lives here, not in QuakeTable, so the page decides what is shown
    // and the table only renders what it's given.
    const [minMag, setMinMag] = useState('')
    const [sortBy, setSortBy] = useState('time')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    // Derived values: recalculated from data + filters on every render, never stored in state.
    const quakes = toQuakes(data)
    const stats = getStats(quakes)
    const buckets = bucketByMagnitude(quakes)
    const visibleQuakes = filterAndSort(quakes, minMag, sortBy)

    const renderContent = () => {
        if (error) {
            return (
                <p className="dashboard-status">
                    Couldn't load earthquake data: {error.message}
                    <button className="btn" onClick={refetch}>Retry</button>
                </p>
            )
        }

        // Check data rather than loading: during a refetch the old quakes stay on screen.
        if (!data) {
            return <p className="dashboard-status">Loading earthquakes…</p>
        }

        return (
            <div className="dashboard-content">
                <SummaryTiles stats={stats} />
                <MagnitudeChart buckets={buckets} />
                <QuakeTable
                    quakes={visibleQuakes}
                    totalCount={quakes.length}
                    minMag={minMag}
                    onMinMagChange={setMinMag}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                />
            </div>
        )
    }

    return (
        <>
            <div className="container dashboard-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={'Dashboard'.split('')}
                        idx={15}
                    />
                </h1>
                {renderContent()}
            </div>
            <Loader type="ball-clip-rotate-multiple" />
        </>
    )
}

export default Dashboard
