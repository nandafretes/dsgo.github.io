export function MissaoCard({ missao, onIniciarMissao }) {
  return (
    // Usamos <article> pois cada card é um item de conteúdo independente.
    <article
      className="missao-card"
      tabIndex="0" 
      aria-labelledby={`missao-titulo-${missao.id}`}
    >
      <div className="missao-icone-container">
        <span
          className="missao-icone"
          role="img" 
          aria-label={`Ícone para a missão ${missao.titulo}`} // Descreve o ícone
        >
          {missao.icone}
        </span>
      </div>

      <div className="missao-conteudo">
        {/* Usamos um id para o aria-labelledby funcionar */}
        <h3 id={`missao-titulo-${missao.id}`}>{missao.titulo}</h3>
        <p className="localizacao">{missao.localizacao}</p>
        <p>{missao.descricao}</p>
        <button
          className="missao-botao"
          // Passamos a missão inteira para a função que será chamada no clique
          onClick={() => onIniciarMissao(missao)}
          aria-label={`Iniciar missão: ${missao.titulo}`}
        >
          Iniciar Missão
        </button>
      </div>
    </article>
  );
}