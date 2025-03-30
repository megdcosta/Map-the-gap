# Interactive Equity Heatmap for City Services

A web app to visualize disparities in access to public services (e.g., healthcare clinics) across Toronto using open city data.

## Tech Stack
- **React + Vite**: Frontend framework and build tool with HMR.
- **Leaflet.js**: Interactive mapping library via `react-leaflet`.
- **PapaParse**: For parsing CSV data.
- **ESLint**: Code linting with React-specific rules.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Build for production: `npm run build`

## Data
- **Healthcare Clinics**: `public/data/healthcare.csv` (Name, Address, Latitude, Longitude)
- **Neighborhoods**: `public/data/neighborhoods.geojson` (GeoJSON for equity overlays, e.g., income levels)

## Features
- Interactive map with healthcare clinic markers.
- Neighborhood equity overlays.
- Filter by neighborhood (WIP).
- Tooltips with service details.