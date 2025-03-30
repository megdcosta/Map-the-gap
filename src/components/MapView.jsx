import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MapView = ({ selectedNeighborhood }) => {
  const [clinics, setClinics] = useState([]);
  const [zones, setZones] = useState(null);

  useEffect(() => {
    // Load CSV data for clinics
    Papa.parse('/data/healthcare.csv', {
      header: true,
      download: true,
      complete: (results) => {
        setClinics(results.data.filter(clinic => clinic.Latitude && clinic.Longitude));
      }
    });

    // Load GeoJSON for neighborhood overlays
    fetch('/data/neighborhoods.geojson')
      .then(res => res.json())
      .then(setZones);
  }, []);

  const getZoneStyle = (feature) => {
    const income = feature.properties.income_level;
    return {
      color: income === 'low' ? '#ff0000' : income === 'high' ? '#00ff00' : '#555',
      fillOpacity: 0.4,
      weight: 2,
    };
  };

  const filteredClinics = selectedNeighborhood
    ? clinics.filter(clinic => {
        // Placeholder logic—replace with actual neighborhood boundary check if needed
        return true; // For now, no real filtering by coordinates
      })
    : clinics;

  return (
    <MapContainer center={[43.65, -79.38]} zoom={11} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© OpenStreetMap contributors'
      />

      {/* Show equity zones */}
      {zones && (
        <GeoJSON
          data={zones}
          style={getZoneStyle}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(
              `<strong>${feature.properties.name}</strong><br/>Income Level: ${feature.properties.income_level}`
            );
          }}
        />
      )}

      {/* Plot healthcare clinics */}
      {filteredClinics.map((clinic, i) => (
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