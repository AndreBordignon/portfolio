/**
 * Um `<script type="application/ld+json">` por página, renderizado no servidor.
 * Sem `next/script` de propósito: crawler que não executa JS precisa achar o
 * bloco no HTML inicial.
 */
export default function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo vem de JSON.stringify sobre dados nossos — não há input de usuário.
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
