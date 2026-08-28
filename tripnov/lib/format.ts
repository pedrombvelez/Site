import type { Idioma } from "./types";

const LOCALE: Record<Idioma, string> = {
  pt: "pt-PT",
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
};

export function euros(valor: number, moeda = "EUR"): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: moeda,
    maximumFractionDigits: 0,
  }).format(valor);
}

export function data(iso: string, idioma: Idioma = "pt"): string {
  return new Intl.DateTimeFormat(LOCALE[idioma], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function dataCurta(iso: string, idioma: Idioma = "pt"): string {
  return new Intl.DateTimeFormat(LOCALE[idioma], {
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

export function intervalo(inicio: string, fim: string, idioma: Idioma = "pt"): string {
  return `${dataCurta(inicio, idioma)} – ${data(fim, idioma)}`;
}

export function noites(inicio: string, fim: string): number {
  const ms = new Date(fim).getTime() - new Date(inicio).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

/** Data do dia N de uma viagem que começa em `inicio`, em ISO (YYYY-MM-DD). */
export function diaDaViagem(inicio: string, dia: number): string {
  const d = new Date(inicio);
  d.setDate(d.getDate() + dia - 1);
  return d.toISOString().slice(0, 10);
}

export function iniciais(nome: string): string {
  return nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function id(prefixo: string): string {
  return `${prefixo}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Token de link privado. Longo o suficiente para não se adivinhar. */
export function token(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
