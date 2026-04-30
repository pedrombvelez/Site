// Auth helpers para o gate do livro.
// Não é encriptação militar — é um cadeado simples para travar curiosos
// e robots de motores de busca.
//
// Como configurar:
//   - Define a variável de ambiente LIVRO_PASSWORD na Vercel
//     (Project → Settings → Environment Variables) com a palavra
//     que ela vai escrever para entrar.
//   - Localmente, copia .env.example para .env.local e edita.
//
// Se LIVRO_PASSWORD não estiver definida, é usado o fallback "pedrinho".

export const COOKIE_NAME = "livro-auth";

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export function getPassword(): string {
  return process.env.LIVRO_PASSWORD || "pedrinho";
}

/**
 * Comparação de strings em tempo (quase-)constante.
 * Não é critical-security mas evita timing attacks triviais.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
