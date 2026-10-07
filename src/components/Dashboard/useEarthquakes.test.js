import { renderHook, waitFor, act } from '@testing-library/react'
import useEarthquakes, { USGS_URL } from './useEarthquakes'

const feed = {
    type: 'FeatureCollection',
    features: [{ id: 'a', properties: { place: 'Anza, CA', mag: 1.4, time: 1 } }],
}

// jsdom has no fetch, so each test installs its own fake and we remove it afterwards.
afterEach(() => {
    delete global.fetch
})

test('returns the feed data on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(feed) })

    const { result } = renderHook(() => useEarthquakes())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(feed)
    expect(result.current.error).toBeNull()
    expect(global.fetch).toHaveBeenCalledWith(
        USGS_URL,
        expect.objectContaining({ signal: expect.any(AbortSignal) })
    )
})

test('sets error when the server responds with an HTTP error', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    const { result } = renderHook(() => useEarthquakes())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.data).toBeNull()
})

test('sets error when the network request fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'))

    const { result } = renderHook(() => useEarthquakes())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error.message).toBe('Failed to fetch')
})

test('aborts the request when the component unmounts', () => {
    // A promise that never settles keeps the request "in flight".
    global.fetch = jest.fn(() => new Promise(() => {}))

    const { unmount } = renderHook(() => useEarthquakes())
    const { signal } = global.fetch.mock.calls[0][1]

    expect(signal.aborted).toBe(false)
    unmount()
    expect(signal.aborted).toBe(true)
})

test('refetch requests the feed again', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(feed) })

    const { result } = renderHook(() => useEarthquakes())
    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => result.current.refetch())

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
    await waitFor(() => expect(result.current.loading).toBe(false))
})
