import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MapView = () => {
  const [clinics, setClinics] = useState([]);
  const [zones, setZones] = useState(null);

  useEffect(() => {
    // Load CSV data for clinics
    Papa.parse('/data/healthcare.csv', {
      header: true,
      download: true,
      complete: (results) => {
        setClinics(results.data);
      }
    });

    // Load GeoJSON for neighborhood overlays
    fetch('/data/neighborhoods.geojson')
      .then(res => res.json())
      .then(setZones);
  }, []);

  return (
    <MapContainer center={[43.65, -79.38]} zoom={11} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Show equity zones */}
      {zones && (
        <GeoJSON data={zones} style={{ color: '#555', fillOpacity: 0.2 }} />
      )}

      {/* Plot healthcare clinics */}
      {clinics.map((clinic, i) => (
        <Marker
          key={i}
          position={[parseFloat(clinic.Latitude), parseFloat(clinic.Longitude)]}
        >
          <Popup>
            <strong>{clinic.Name}</strong><br />
            {clinic.Address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
