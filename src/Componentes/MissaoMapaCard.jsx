// src/components/MissaoMapaCard.js

import { useState } from "react";
// Importamos apenas os componentes essenciais do react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

/**
 * Calcula uma distância aproximada. 
 * É mais fácil de entender que a fórmula complexa. Para a nossa aula, é perfeito.
 * Uma distância de 0.0005 aqui equivale a mais ou menos 50 metros.
 */
function calcularDistanciaAproximada(lat1, lon1, lat2, lon2) {
    const distancia = Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
    return distancia;
}

export function MissaoMapaCard({ missao }) {
    // ---- ESTADO DO COMPONENTE ----
    // Cada card terá sua própria memória para estas 3 coisas:
    const [status, setStatus] = useState("");                 // A mensagem para o aluno (Ex: "Você está perto!").
    const [posicaoJogador, setPosicaoJogador] = useState(null); // Onde o aluno está [latitude, longitude].
    const [verificando, setVerificando] = useState(false);       // Para desabilitar o botão enquanto o GPS procura.

    // Se a missão não tiver coordenadas, mostramos uma mensagem simples.
    if (!missao.latitude || !missao.longitude) {
        return (
            <article className="missao-mapa-card">
                <h3>{missao.titulo}</h3>
                <p>Localização desta missão não foi definida.</p>
            </article>
        );
    }

    // ---- AÇÃO PRINCIPAL ----
    // Esta função é chamada quando o aluno clica no botão.
    function handleVerificarClick() {
        // 1. Avisa o aluno que estamos procurando
        setVerificando(true);
        setStatus("🔍 Procurando sua localização...");

        // 2. Pede ao navegador a posição do GPS
        navigator.geolocation.getCurrentPosition(
            // 3. SUCESSO: O navegador encontrou a localização
            (posicao) => {
                const { latitude, longitude } = posicao.coords;
                setPosicaoJogador([latitude, longitude]); // Guarda a posição para mostrar no mapa

                // 4. Calcula a distância
                const distancia = calcularDistanciaAproximada(latitude, longitude, missao.latitude, missao.longitude);

                // 5. Verifica se está perto o suficiente
                if (distancia <= 0.0005) { // Nosso "raio" de 50 metros
                    setStatus("✅ Você conseguiu! Está no local certo!");
                } else {
                    setStatus("Continue andando, você está quase lá!");
                }
                setVerificando(false); // Terminou, ativa o botão de novo
            },
            // 6. ERRO: O navegador não conseguiu encontrar
            (erro) => {
                setStatus("❌ Não foi possível obter sua localização. Verifique as permissões do navegador.");
                setVerificando(false); // Terminou, ativa o botão de novo
            }
        );
    }

    // ---- RENDERIZAÇÃO (O que aparece na tela) ----
    return (
        <article className="missao-card" tabIndex="0">
            <div className="missao-icone-container">
                <h3>{missao.titulo}</h3>
            </div>
            <p>{missao.descricao}</p>
            
            <div className="localizacao">
                <MapContainer 
                    center={[missao.latitude, missao.longitude]} 
                    zoom={18} 
                    style={{ height: "200px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                    />
                    {/* Marcador do destino (usará o ícone azul padrão) */}
                    <Marker position={[missao.latitude, missao.longitude]}>
                        <Popup>Destino: {missao.titulo}</Popup>
                    </Marker>
                    
                    {/* Se já sabemos onde o jogador está, mostramos seu marcador */}
                    {posicaoJogador && (
                        <Marker position={posicaoJogador}>
                            <Popup>Você está aqui</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* O botão que chama nossa função principal */}
            <button onClick={handleVerificarClick} disabled={verificando} className="missao-botao">
                {verificando ? 'Procurando...' : 'Estou no Local!'}
            </button>
            
            {/* Mostra a mensagem de status para o aluno */}
            {status && <p className="status-missao">{status}</p>}
        </article>
    );
}