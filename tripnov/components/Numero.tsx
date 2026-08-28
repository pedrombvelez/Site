export function Numero({
  valor,
  rotulo,
  nota,
}: {
  valor: string;
  rotulo: string;
  nota?: string;
}) {
  return (
    <div className="cartao p-4">
      <p className="text-xs font-semibold tracking-wide text-tinta-fraca uppercase">
        {rotulo}
      </p>
      <p className="mt-1 font-serif text-3xl">{valor}</p>
      {nota ? <p className="mt-1 text-xs text-tinta-fraca">{nota}</p> : null}
    </div>
  );
}
