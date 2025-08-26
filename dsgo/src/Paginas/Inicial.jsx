import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from '../Componentes/Cabecalho';
import { Conteudo } from "../Componentes/Conteudo";
import { Footer } from "../Componentes/Footer";

export function Inicial() {
    return (
        <>
            <div className="app-layout">
                <div className="main-wrapper">
                    <Cabecalho />
                    <BarraNavegacao />
                    <Conteudo />
                </div>
                <Footer />
            </div>
        </>
    );

}