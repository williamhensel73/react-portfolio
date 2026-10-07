import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// react-leaflet (used by Contact) ships ES modules that Create React App's Jest can't load.
jest.mock('./components/Contact', () => () => null)

afterEach(() => {
    delete global.fetch
})

test('the /dashboard route renders the Dashboard page', async () => {
    // Never resolves, so the page stays in its loading state for this test.
    global.fetch = jest.fn(() => new Promise(() => {}))

    render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <App />
        </MemoryRouter>
    )

    // Dashboard is lazy-loaded, so wait for it to arrive before checking the page.
    expect(await screen.findByText('Loading earthquakes…')).toBeInTheDocument()
    // AnimatedLetters puts each letter in its own <span>, so check the text, not the accessible name.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dashboard')
})
