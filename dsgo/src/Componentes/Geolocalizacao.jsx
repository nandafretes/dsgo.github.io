import { useState, useEffect } from "react";
import { locaisEscola } from "../Dados/locaisEscola";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Ícone da missão
const iconeMissao = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// 🔹 Subcomponente que corrige o problema do mapa cortado
function AjustarMapa() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
}

export function Geolocalizacao({ titulo, local, descricao, icone, onLocalCorreto }) {
    const [status, setStatus] = useState("");
    const [posicaoJogador, setPosicaoJogador] = useState(null);

    // Garantir que a chave seja buscada em minúsculo
    const destino = locaisEscola[local.toLowerCase()];

    function verificarLocalizacao() {
        if (!navigator.geolocation) {
            setStatus("⚠️ Geolocalização não suportada.");
            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setPosicaoJogador([latitude, longitude]);

            // Distância aproximada em metros
            const distancia = Math.sqrt(
                (latitude - destino.lat) ** 2 + (longitude - destino.lng) ** 2
            ) * 111000;

            if (distancia <= 20) {
                setStatus("✅ Você está no local correto!");
                onLocalCorreto(true);
            } else {
                setStatus(`📍 Você está a ${Math.round(distancia)} metros do destino.`);
                onLocalCorreto(false);
            }
        });
    }

    return (
        <article className="geolocalizacao-card" tabIndex="0" aria-label={`Missão: ${titulo}`}>
            <div className="geo-header">
                <span className="geo-icone" role="img" aria-label={local}>{icone}</span>
                <h3>{titulo}</h3>
            </div>

            <p>{descricao}</p>

            <button onClick={verificarLocalizacao}>📍 Verificar Localização</button>

            {status && <p className="status">{status}</p>}

            <div className="mapa-container">
                <MapContainer
                    center={[destino.lat, destino.lng]}
                    zoom={18}
                    style={{ height: "250px", width: "100%" }}
                >
                    <AjustarMapa />
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[destino.lat, destino.lng]} icon={iconeMissao}>
                        <Popup>Destino: {titulo}</Popup>
                    </Marker>

                    {posicaoJogador && (
                        <Marker position={posicaoJogador}>
                            <Popup>Você está aqui</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </article>
    );
}
