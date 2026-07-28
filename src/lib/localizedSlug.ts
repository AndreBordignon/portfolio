import { services } from "@/data/services";
import type { Locale } from "@/data/projects";

/**
 * Traduz um slug entre idiomas. Só serviços têm slug traduzido
 * (`programador-freelance` ↔ `freelance-developer`); cases usam o mesmo nos dois.
 *
 * Sem isso, trocar de idioma numa página de serviço leva a 404 — o seletor
 * mandaria o slug em português para a rota em inglês.
 */
export function alternateSlug(slug: string, from: Locale, to: Locale) {
  const service = services.find((s) => s.slug[from] === slug);
  return service ? service.slug[to] : slug;
}
