import { useRef, useEffect, useState } from "react"; 
// Importa hooks do React:
// useRef -> referência a elementos DOM (vídeo e canvas)
// useEffect -> para executar efeitos colaterais (inicializar/parar câmera)
// useState -> para controlar estados do componente (ex: mostrar vídeo ou não)

export function CameraApp() {
  const videoRef = useRef(null); // referência do elemento <video>
  const canvasRef = useRef(null); // referência do elemento <canvas>
  const streamRef = useRef(null); // referência ao stream da câmera (para parar depois)

  const [showVideo, setShowVideo] = useState(true); 
  // Estado que controla se a seção do vídeo deve ser exibida

  useEffect(() => {
    startCamera(); // inicia a câmera ao montar o componente
    return () => stopCamera(); // para a câmera ao desmontar o componente
  }, []); // [] -> efeito executa apenas uma vez

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } }) 
      // solicita acesso à câmera frontal do dispositivo
      .then((stream) => {
        streamRef.current = stream; 
        // armazena o stream para poder parar depois

        if (videoRef.current) videoRef.current.srcObject = stream; 
        // conecta o stream ao elemento <video>

        setShowVideo(true); 
        // garante que a seção do vídeo esteja visível
      })
      .catch((err) => console.error("Erro ao acessar a câmera:", err));
      // trata erros (ex: usuário negou permissão)
  }

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return; 
    // garante que os elementos existam antes de tentar capturar

    const ctx = canvasRef.current.getContext("2d"); 
    // obtém o contexto 2D do canvas para desenhar a imagem

    canvasRef.current.width = videoRef.current.videoWidth; 
    canvasRef.current.height = videoRef.current.videoHeight; 
    // define o tamanho do canvas igual ao vídeo

    ctx.drawImage(videoRef.current, 0, 0); 
    // desenha o frame atual do vídeo no canvas

    stopCamera(); 
    // desliga a câmera após capturar a foto

    setShowVideo(false); 
    // esconde a seção do vídeo
  }

  function stopCamera() {
    const stream = streamRef.current; 
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); 
      // para todas as trilhas do stream (vídeo/áudio)

      streamRef.current = null; 
      // limpa a referência do stream
    }
  }

  // Função para reiniciar o componente como um "F5"
  function resetCamera() {
    // Limpa o canvas
    const ctx = canvasRef.current?.getContext("2d"); 
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // remove qualquer imagem anterior
    }

    setShowVideo(true); 
    // mostra novamente a seção do vídeo

    startCamera(); 
    // reinicia a câmera
  }

  return (
    <main className="conteiner">
      {/* Seção da câmera */}
      {showVideo && (
        <section aria-labelledby="camera-section-title" className="sectionCamera">
          <h1 id="camera-section-title" className="titulo">
            Captura de Imagem
          </h1>

          <video
            ref={videoRef} // conecta a referência do vídeo
            autoPlay
            playsInline
            aria-label="Visualização da câmera ao vivo"
          ></video>

          <button type="button" onClick={capturePhoto} className="buttonCamera">
            Tirar Foto
          </button>
        </section>
      )}

      {/* Seção de pré-visualização */}
      <section aria-labelledby="preview-section-title" className="sectionCamera">
        <h2 id="preview-section-title">Pré-visualização</h2>
        <canvas
          ref={canvasRef} // conecta a referência do canvas
          role="img"
          aria-label="Foto capturada da câmera"
        ></canvas>

        {/* Botão de reiniciar */}
        <button type="button" onClick={resetCamera} className="buttonCamera">
          Reiniciar
        </button>
      </section>
    </main>
  );
}
