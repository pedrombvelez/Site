import Link from "next/link";
import { marca } from "@/lib/marca";

export default function Obrigado() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20 text-center">
      <h1 className="font-serif text-3xl">Recebido.</h1>
      <p className="mt-3 text-tinta-fraca">
        Respondo em 24 horas, com uma primeira ideia de itinerário e um preço.
        Se for urgente, ligue para {marca.telefone}.
      </p>
      <Link href="/pedidos" className="botao mt-8">
        Ver como chegou à consola →
      </Link>
      <p className="mt-3 text-xs text-tinta-fraca">
        (este último botão só existe na demo)
      </p>
    </div>
  );
}
