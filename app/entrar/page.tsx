import { Heart, Lock } from "lucide-react";
import { entrar } from "./actions";

export const metadata = {
  title: "Entrar — Para a mamã do Pedrinho",
};

type SearchParams = Promise<{ erro?: string }>;

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { erro } = await searchParams;

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="relative max-w-md w-full text-center paper rounded-[2rem] border border-terracotta/30 shadow-2xl px-8 sm:px-12 py-12">
        <Heart
          className="absolute top-5 left-5 h-4 w-4 text-rose"
          fill="currentColor"
        />
        <Heart
          className="absolute top-5 right-5 h-4 w-4 text-rose"
          fill="currentColor"
        />
        <Heart
          className="absolute bottom-5 left-5 h-4 w-4 text-rose"
          fill="currentColor"
        />
        <Heart
          className="absolute bottom-5 right-5 h-4 w-4 text-rose"
          fill="currentColor"
        />

        <Lock className="mx-auto h-7 w-7 text-terracotta-deep" />

        <h1 className="mt-3 font-serif italic text-3xl text-ink leading-tight">
          Olá, mamã.
        </h1>

        <p className="mt-3 font-handwritten text-2xl text-ink-soft">
          este livro é só para ti
        </p>

        <p className="mt-5 font-serif text-lg text-ink/80">
          Escreve a palavrinha mágica para abrir.
        </p>

        <form action={entrar} className="mt-6 flex flex-col items-center gap-3">
          <input
            type="password"
            name="password"
            autoFocus
            autoComplete="off"
            required
            placeholder="palavrinha mágica"
            className="w-full rounded-full border border-terracotta/40 bg-cream px-5 py-3 font-serif text-lg text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/20"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3 text-cream shadow-lg hover:bg-terracotta-deep transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-terracotta/40"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="font-serif text-lg">Abrir</span>
          </button>

          {erro && (
            <p className="font-handwritten text-xl text-terracotta-deep mt-2">
              não foi essa, tenta outra vez ♡
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
