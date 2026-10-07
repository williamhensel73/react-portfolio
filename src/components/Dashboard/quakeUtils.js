const toQuakes = (geojson) => {
    if (geojson ==null) {
        return [];
    }
    const quakes = geojson.features.filter(({ properties }) => properties.mag != null).map(({ id, properties }) => ({
        id,
        place: properties.place ?? "Unknown Location",
        mag: properties.mag,
        time: properties.time,
    }));
    return quakes;
};

const getStats = (quakes) => {
    if (quakes.length === 0) {
        return {
            total: 0,
            maxMag: null,
            avgMag: null,
        };
    }
    const maxMag = Math.max(...quakes.map(({ mag }) => mag));
    const avgMag = quakes.reduce((sum, { mag }) => sum + mag, 0) / quakes.length;
    return {
        total: quakes.length,
        maxMag,
        avgMag,
    };
}

const bucketByMagnitude = (quakes) => {
    const buckets = [{ range: '<1', count: 0 }, { range: '1-2', count: 0 }, { range: '2-3', count: 0 }, { range: '3-4', count: 0 }, { range: '4-5', count: 0 }, { range: '5+', count: 0 }];
    for (const quake of quakes) {
        const mag = quake.mag;
        if (mag < 1) {
            buckets[0].count++;
        } else if (mag < 2) {
            buckets[1].count++;
        } else if (mag < 3) {
            buckets[2].count++;
        } else if (mag < 4) {
            buckets[3].count++;
        } else if (mag < 5) {
            buckets[4].count++;
        } else {
            buckets[5].count++;
        }
    }
    return buckets;
}

const filterAndSort = (quakes, minMag, sortBy) => {
    const min = minMag === '' ? -Infinity : Number(minMag);

    return quakes
        .filter((quake) => quake.mag >= min)
        .sort((a, b) => (sortBy === 'mag' ? b.mag - a.mag : b.time - a.time));
};

export { toQuakes, getStats, bucketByMagnitude, filterAndSort };