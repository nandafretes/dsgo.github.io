// import { useState, useEffect } from "react";

// export function useTesteLocalizacao(options = {}) {
// const [coords, setCoords] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError(new Error("Geolocalização não suportada."));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => setCoords(pos.coords),
//       (err) => setError(err),
//       options // agora options existe sempre
//     );
//   }, [options]);

//   return { coords, error };
// }


import { useState, useEffect } from "react";

export function useTesteLocalizacao(options = {}) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocalização não suportada."));
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => setCoords(pos.coords),
      (err) => setError(err),
      {
        enableHighAccuracy: true, // tenta usar GPS se disponível
        maximumAge: 0,            // não usa posições antigas
        timeout: 10000,           // espera até 10s pela posição
        ...options                // permite sobrescrever com opções passadas
      }
    );

    return () => navigator.geolocation.clearWatch(watcher); // limpa watcher ao desmontar
  }, [options]);

  return { coords, error };
}
