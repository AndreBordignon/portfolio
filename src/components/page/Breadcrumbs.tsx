import { Link } from "@/i18n/routing";
import type { Pathname } from "@/i18n/routing";

export type Crumb = {
  label: string;
  href?: Pathname;
  params?: Record<string, string>;
};

/**
 * Trilha visível — a mesma que vai no BreadcrumbList do JSON-LD.
 * Migalha que só existe no schema e não na tela é exatamente o tipo de
 * divergência que o Google penaliza.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={{ pathname: item.href, params: item.params } as any}
                  className="type-label transition-colors hover:text-ember"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="type-label" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="type-label">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
