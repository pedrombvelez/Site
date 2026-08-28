/**
 * Marca do consultor. Vem de variáveis de ambiente para que a mesma base de
 * código sirva outro consultor sem editar componentes.
 */
export const marca = {
  nome: process.env.NEXT_PUBLIC_MARCA_NOME ?? "Atelier de Viagens",
  consultor: process.env.NEXT_PUBLIC_MARCA_CONSULTOR ?? "Miguel Andrade",
  email: process.env.NEXT_PUBLIC_MARCA_EMAIL ?? "miguel@atelierdeviagens.pt",
  telefone: process.env.NEXT_PUBLIC_MARCA_TELEFONE ?? "+351 912 345 678",
};

export const CONSULTOR_ID = "consultor_1";
