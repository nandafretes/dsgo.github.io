// import { MissaoCard } from "./MissaoCard";
// import { TesteMapa } from "./TesteMapa";
import { CameraApp } from './CameraApp';

export function Conteudo() {
  return (
    <main className="conteudo-principal">
      <header className="conteudo-cabecalho">
        <h1 id="titulo-missoes">Missões Disponíveis</h1>
        <p>
          Sua jornada para se tornar um Dev Mestre começa agora! Vá até um
          local e verifique sua posição.
        </p>
      </header>

      <div className="missoes-grid">
        {/* <TesteMapa /> */}
        {/* <MissaoCard/> */}
        <CameraApp/>
        
      </div>
    </main>
  );
}