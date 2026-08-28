import { receberPedido } from "@/lib/actions";
import { marca } from "@/lib/marca";

export default function Formulario() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="font-serif text-3xl">Conte-me a viagem</h1>
      <p className="mt-2 text-tinta-fraca">
        Quanto mais me disser aqui, menos perguntas lhe faço depois. Respondo em
        24 horas, sempre com uma pessoa do outro lado.
      </p>

      <form action={receberPedido} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="etiqueta" htmlFor="nome">Nome</label>
            <input id="nome" name="nome" required className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="telefone">Telefone</label>
            <input id="telefone" name="telefone" className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="destino">Destino</label>
            <input
              id="destino"
              name="destino"
              required
              placeholder="Ou 'ainda não sei'"
              className="campo"
            />
          </div>
          <div>
            <label className="etiqueta" htmlFor="dataInicio">De</label>
            <input id="dataInicio" name="dataInicio" type="date" required className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="dataFim">A</label>
            <input id="dataFim" name="dataFim" type="date" required className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="adultos">Adultos</label>
            <input
              id="adultos"
              name="adultos"
              type="number"
              min={1}
              defaultValue={2}
              className="campo"
            />
          </div>
          <div>
            <label className="etiqueta" htmlFor="criancas">Crianças</label>
            <input
              id="criancas"
              name="criancas"
              type="number"
              min={0}
              defaultValue={0}
              className="campo"
            />
          </div>
        </div>

        <div>
          <label className="etiqueta" htmlFor="orcamento">
            Orçamento total, em euros
          </label>
          <input
            id="orcamento"
            name="orcamento"
            type="number"
            required
            placeholder="4000"
            className="campo"
          />
          <p className="mt-1 text-xs text-tinta-fraca">
            Um número aproximado chega. Serve para eu não lhe propor coisas que
            não fazem sentido.
          </p>
        </div>

        <div>
          <label className="etiqueta" htmlFor="estilo">Como gostam de viajar</label>
          <input
            id="estilo"
            name="estilo"
            placeholder="Devagar, com bons hotéis e sem madrugadas"
            className="campo"
          />
        </div>

        <div>
          <label className="etiqueta" htmlFor="interesses">
            Interesses, separados por vírgulas
          </label>
          <input
            id="interesses"
            name="interesses"
            placeholder="Gastronomia, praia, mercados"
            className="campo"
          />
        </div>

        <div>
          <label className="etiqueta" htmlFor="restricoes">
            Alergias, limitações, o que evitar
          </label>
          <input
            id="restricoes"
            name="restricoes"
            placeholder="Alergia a marisco; evitar voos com escala longa"
            className="campo"
          />
        </div>

        <div>
          <label className="etiqueta" htmlFor="mensagem">
            E o resto, nas suas palavras
          </label>
          <textarea id="mensagem" name="mensagem" rows={4} className="campo" />
        </div>

        <button className="botao">Enviar o pedido</button>
        <p className="text-xs text-tinta-fraca">
          Os seus dados ficam com {marca.consultor} e mais ninguém.
        </p>
      </form>
    </div>
  );
}
