// src/hooks/useGeolocalizacao.js

import { useState, useEffect } from 'react';

// Hooks personalizados sempre começam com a palavra "use"
export function useGeolocalizacao() {
  // Estado para armazenar a posição (latitude/longitude)
  const [posicao, setPosicao] = useState(null);
  // Estado para armazenar qualquer erro que ocorra
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Verifica se o navegador suporta geolocalização
    if (!navigator.geolocation) {
      setErro('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    // "Assiste" a posição do usuário. A função é chamada sempre que a posição muda.
    const watchId = navigator.geolocation.watchPosition(
      // Função de sucesso: chamada quando a localização é obtida
      (pos) => {
        setPosicao({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setErro(null); // Limpa erros anteriores se funcionar
      },
      // Função de erro: chamada se algo der errado
      (err) => {
        setErro(err.message);
      },
      // Opções para obter a localização com alta precisão
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Função de limpeza: será executada quando o componente que usa o hook "desmontar"
    // Isso é MUITO importante para evitar vazamentos de memória.
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // O array vazio [] faz com que este useEffect rode apenas uma vez

  // O hook retorna a posição e o erro para quem o chamou
  return { posicao, erro };
}