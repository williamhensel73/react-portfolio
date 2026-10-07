import { toQuakes, getStats, bucketByMagnitude, filterAndSort } from './quakeUtils'

const quake = (id, mag, time = 0) => ({ id, place: id, mag, time })

describe('toQuakes', () => {
    test('flattens features, drops missing magnitudes, and fills missing places', () => {
        const geojson = {
            features: [
                { id: 'a', properties: { place: 'Anza, CA', mag: 1.4, time: 1 } },
                { id: 'b', properties: { place: null, mag: 4.2, time: 2 } },
                { id: 'c', properties: { place: 'Somewhere', mag: null, time: 3 } },
            ],
        }

        expect(toQuakes(geojson)).toEqual([
            { id: 'a', place: 'Anza, CA', mag: 1.4, time: 1 },
            { id: 'b', place: 'Unknown Location', mag: 4.2, time: 2 },
        ])
    })

    test('returns an empty array while data is still loading', () => {
        expect(toQuakes(null)).toEqual([])
    })
})

describe('getStats', () => {
    test('computes total, largest, and average magnitude', () => {
        const stats = getStats([quake('a', 1.4), quake('b', 4.2)])

        expect(stats.total).toBe(2)
        expect(stats.maxMag).toBe(4.2)
        expect(stats.avgMag).toBeCloseTo(2.8)
    })

    test('returns null magnitudes for an empty list', () => {
        expect(getStats([])).toEqual({ total: 0, maxMag: null, avgMag: null })
    })
})

describe('bucketByMagnitude', () => {
    test('counts quakes per range, including boundaries and negatives', () => {
        const mags = [-0.4, 0.9, 1.0, 2.5, 2.7, 4.99, 5.0, 6.8]
        const buckets = bucketByMagnitude(mags.map((mag, i) => quake(String(i), mag)))

        expect(buckets.map((b) => b.count)).toEqual([2, 1, 2, 0, 1, 2])
    })

    test('keeps all six ranges when there are no quakes', () => {
        const buckets = bucketByMagnitude([])

        expect(buckets.map((b) => b.range)).toEqual(['<1', '1-2', '2-3', '3-4', '4-5', '5+'])
        expect(buckets.every((b) => b.count === 0)).toBe(true)
    })
})

describe('filterAndSort', () => {
    const quakes = [quake('a', 1.4, 300), quake('b', -0.5, 100), quake('c', 4.2, 200), quake('d', 2.5, 400)]
    const ids = (rows) => rows.map((q) => q.id)

    test('an empty filter keeps everything, including negative magnitudes', () => {
        expect(ids(filterAndSort(quakes, '', 'time'))).toEqual(['d', 'a', 'c', 'b'])
    })

    test('filters by a minimum magnitude given as a string', () => {
        expect(ids(filterAndSort(quakes, '2.5', 'mag'))).toEqual(['c', 'd'])
    })

    test('does not reorder the original array', () => {
        filterAndSort(quakes, '', 'mag')
        expect(ids(quakes)).toEqual(['a', 'b', 'c', 'd'])
    })
})
