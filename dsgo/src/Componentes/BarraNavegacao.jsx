export function BarraNavegacao() {
  return (

    <nav className="barra-navegacao" aria-label="Menu principal">
      <ul>
        <li>
          <a href="#home" aria-current="page">Home</a>
        </li>
        <li>
           <a href="#perfil">Perfil</a>
        </li>
        <li>
           <a href="#missao">Missão</a>
        </li>
        <li>
           <a href="#inventario">Inventario</a>
        </li>
      </ul>
    </nav>
  )
}