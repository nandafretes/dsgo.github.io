import { useState } from 'react';

// Um componente simples para demonstrar o conceito fundamental da Geolocalização.
export function TesteGeolocalizacao() {
    
    // --- A "Memória" do nosso componente ---
    // Precisamos de um lugar para guardar a posição encontrada. Começa como nulo.
    const [posicao, setPosicao] = useState(null);
    // E um lugar para guardar qualquer mensagem de erro.
    const [erro, setErro] = useState(null);
    // Um estado para sabermos se estamos "buscando" a localização.
    const [buscando, setBuscando] = useState(false);

    // --- A Função Principal ---
    // Esta função é chamada quando o botão é clicado.
    const handleEncontrarLocalizacao = () => {
        // 1. Limpa os resultados anteriores e avisa que estamos buscando
        setPosicao(null);
        setErro(null);
        setBuscando(true);

        // ==================================================================
        //         👇 O CÓDIGO MÁGICO QUE VOCÊ VAI APRESENTAR 👇
        // ==================================================================
        navigator.geolocation.getCurrentPosition(
            // --- Função de SUCESSO ---
            // Será executada se o navegador conseguir encontrar a localização.
            (posicaoEncontrada) => {
                console.log("Dados brutos da posição:", posicaoEncontrada);
                // Atualiza nossa "memória" (estado) com as coordenadas
                setPosicao({
                    latitude: posicaoEncontrada.coords.latitude,
                    longitude: posicaoEncontrada.coords.longitude,
                });
                // Avisa que terminamos de buscar
                setBuscando(false);
            },
            // --- Função de ERRO ---
            // Será executada se algo der errado (permissão negada, GPS desligado, etc.)
            (erroOcorrido) => {
                console.error("Erro ao obter localização:", erroOcorrido);
                // Atualiza nossa "memória" com a mensagem de erro
                setErro(erroOcorrido.message);
                // Avisa que terminamos de buscar
                setBuscando(false);
            }
        );
        // ==================================================================
    };

    // --- A Parte Visual (O que aparece na tela) ---
    return (
        <div style={{ padding: '2rem', border: '2px solid #005fa3', borderRadius: '8px', fontFamily: 'sans-serif' }}>
            <h2>Teste do "Código Mágico" da Geolocalização</h2>
            <p>Clique no botão abaixo. O navegador irá pedir sua permissão.</p>
            
            {/* O botão que dispara nossa função. Fica desabilitado enquanto busca. */}
            <button onClick={handleEncontrarLocalizacao} disabled={buscando} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
                {buscando ? 'Buscando GPS...' : 'Onde Estou?'}
            </button>

            <div style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
                {/* Mostra a mensagem de "buscando" */}
                {buscando && <p>🔍 Buscando sua localização, aguarde...</p>}
                
                {/* Se deu erro, mostra a mensagem de erro */}
                {erro && <p style={{ color: 'red' }}><strong>Erro:</strong> {erro}</p>}
                
                {/* Se deu certo, mostra as coordenadas */}
                {posicao && (
                    <div style={{ color: 'green' }}>
                        <strong>🎉 Sucesso! Localização encontrada:</strong>
                        <ul>
                            <li>Latitude: {posicao.latitude}</li>
                            <li>Longitude: {posicao.longitude}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}