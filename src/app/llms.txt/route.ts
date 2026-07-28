import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/cases";
import { anchorStatement, baseUrl, person } from "@/lib/site";

/**
 * llms.txt — mapa do site em markdown puro, para crawlers de IA.
 *
 * Gerado a partir dos mesmos dados que renderizam as páginas: se um serviço ou
 * case for adicionado, ele aparece aqui sozinho. Arquivo escrito à mão vira
 * mentira em duas semanas.
 */
export const dynamic = "force-static";

function line(title: string, url: string, summary: string) {
  return `- [${title}](${url}): ${summary}`;
}

export function GET() {
  const body = `# André Bordignon

> ${anchorStatement["pt-BR"]}

${person.name} é ${person.jobTitle["pt-BR"].toLowerCase()}, atua desde ${person.since} e é baseado em ${person.city}, ${person.regionName}, ${person.countryName}. Atende clientes em todo o Brasil de forma remota. Trabalha sozinho, sem terceirizar: direção de arte, arquitetura, código e deploy.

- Contato: ${person.email}
- WhatsApp: ${person.phone}
- Idiomas: Português (nativo), Inglês
- Stack principal: React, Next.js, TypeScript, React Native, Node.js, PostgreSQL

## Serviços

${services
  .map((s) =>
    line(
      s.title["pt-BR"],
      `${baseUrl}/servicos/${s.slug["pt-BR"]}`,
      s.seoDescription["pt-BR"],
    ),
  )
  .join("\n")}

## Cases

${projects
  .map((p) => {
    const study = caseStudies.find((c) => c.slug === p.slug);
    return line(
      `${p.title} (${p.year})`,
      `${baseUrl}/cases/${p.slug}`,
      study?.seoDescription["pt-BR"] ?? p.tagline["pt-BR"],
    );
  })
  .join("\n")}

## Páginas

${line("Início", baseUrl, "Portfólio cinematográfico com os projetos em destaque e formulário de contato.")}
${line("Serviços", `${baseUrl}/servicos`, "O que ele constrói, para quem, e como funciona a contratação.")}
${line("Cases", `${baseUrl}/cases`, "Projetos em produção com o problema, a abordagem e o resultado de cada um.")}
${line("Sobre", `${baseUrl}/sobre`, "Trajetória, ficha de fatos e as disciplinas que ele exerce.")}

## Perfis externos

${person.sameAs.map((url) => `- ${url}`).join("\n")}

## Versão em inglês

Todo o conteúdo existe em inglês sob ${baseUrl}/en.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
