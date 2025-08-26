// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';

// // export function TesteMapa() {
// //   return (
// //     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }}>
// //       <TileLayer 
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //       />
// //       <Marker position={[51.505, -0.09]}>
// //         <Popup>Você está aqui!</Popup>
// //       </Marker>
// //     </MapContainer>
// //   );
// // }
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useTesteLocalizacao } from "./Teste";

// export function TesteMapa() {
//   const { coords, error } = useTesteLocalizacao({
//     enableHighAccuracy: true,
//     maximumAge: 10000,
//     timeout: 5000
//   });

//   if (error) {
//     return <p>Erro ao obter localização: {error.message}</p>;
//   }

//   if (!coords) {
//     return <p>Obtendo localização...</p>;
//   }

//   return (
//     <MapContainer
//       center={[coords.latitude, coords.longitude]}
//       zoom={16}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[coords.latitude, coords.longitude]}>
//         <Popup>Você está aqui!</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useTesteLocalizacao } from "./Teste";

// Componente auxiliar para atualizar a posição do mapa
function Recenter({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView([coords.latitude, coords.longitude], map.getZoom());
  }
  return null;
}

export function TesteMapa() {
  const { coords, error } = useTesteLocalizacao();

  if (error) return <p>Erro ao obter localização: {error.message}</p>;
  if (!coords) return <p>Obtendo localização...</p>;

  return (
    <MapContainer
      center={[coords.latitude, coords.longitude]}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coords.latitude, coords.longitude]}>
        <Popup>Você está aqui!</Popup>
      </Marker>

      {/* Atualiza automaticamente a posição do mapa */}
      <Recenter coords={coords} />
    </MapContainer>
  );
}
