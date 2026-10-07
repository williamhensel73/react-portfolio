import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from '.'

// Recharts measures its container with ResizeObserver, which jsdom doesn't have.
// The chart isn't what this test is about, so swap it for an empty component.
jest.mock('./MagnitudeChart/magnitudeChart', () => () => null)

const feed = {
    features: [
        { id: 'small', properties: { place: 'Small Quake Town', mag: 1.2, time: 1 } },
        { id: 'medium', properties: { place: 'Medium Quake City', mag: 3.1, time: 2 } },
        { id: 'large', properties: { place: 'Large Quake Bay', mag: 5.6, time: 3 } },
    ],
}

beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(feed) })
})

afterEach(() => {
    delete global.fetch
})

test('typing a minimum magnitude hides smaller quakes from the table', async () => {
    render(<Dashboard />)

    // findBy* waits for the fetch to resolve and the table to appear.
    expect(await screen.findByText('Small Quake Town')).toBeInTheDocument()
    expect(screen.getByText('Showing 3 of 3')).toBeInTheDocument()

    userEvent.type(screen.getByLabelText('Min magnitude'), '3')

    expect(screen.queryByText('Small Quake Town')).not.toBeInTheDocument()
    expect(screen.getByText('Medium Quake City')).toBeInTheDocument()
    expect(screen.getByText('Large Quake Bay')).toBeInTheDocument()
    expect(screen.getByText('Showing 2 of 3')).toBeInTheDocument()

    userEvent.clear(screen.getByLabelText('Min magnitude'))

    expect(screen.getByText('Small Quake Town')).toBeInTheDocument()
})

test('shows an error and a retry button when the request fails', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 503 })

    render(<Dashboard />)

    expect(await screen.findByRole('button', { name: 'Retry' })).toBeInTheDocument()
    expect(screen.getByText(/couldn't load earthquake data/i)).toBeInTheDocument()
})
