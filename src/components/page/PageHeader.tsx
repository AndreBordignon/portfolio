import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";

/**
 * Cabeçalho das páginas internas. Sem WebGL de propósito: são páginas de
 * leitura, e o peso da cena 3D atrapalharia o LCP delas.
 *
 * O `lede` é a frase auto-contida que abre a página — a que uma IA consegue
 * citar sem precisar do resto do contexto.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="relative overflow-hidden border-b border-[color:var(--line)] bg-ink pb-16 pt-32 md:pb-24 md:pt-44">
      {/* Brasa remanescente da cena de abertura da home — amarra as páginas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_100%_at_50%_-20%,rgba(249,115,22,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <Breadcrumbs items={crumbs} />

        <p className="type-label mt-10">{eyebrow}</p>

        <SplitLines as="h1" className="type-h2 mt-5 max-w-5xl text-balance" type="words">
          {title}
        </SplitLines>

        <Reveal delay={0.1}>
          <p className="type-lead mt-8 max-w-3xl text-muted text-balance">{lede}</p>
        </Reveal>
      </div>
    </header>
  );
}
