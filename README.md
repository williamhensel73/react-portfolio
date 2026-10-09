# William Hensel — Portfolio

My personal site: about me, projects, a live earthquake data dashboard, and a contact form.

Live at **https://williamhensel73.github.io/react-portfolio**

## Built with

- React 18 and React Router (hash routing for GitHub Pages)
- SCSS, animate.css, and loaders.css for styling and animation
- Recharts for the dashboard, fed by the USGS earthquake API
- React Leaflet for the contact page map
- EmailJS to send contact form messages
- Jest and React Testing Library for tests

## Running locally

```sh
npm install
npm start      # dev server at http://localhost:3000
npm test       # tests in watch mode
npm run build  # production build in build/
```

## Adding a portfolio project

Projects are listed in `src/data/portfolio.json`. Add an entry with a `title`, `description`, `url`, and a `cover` image path, and put the image in `public/portfolio/`.

## Deployment

Every push to `master` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.
