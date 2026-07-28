import Reveal from "@/components/motion/Reveal";

/**
 * FAQ em `<details>` nativo: abre sem JavaScript e o texto da resposta está
 * sempre no HTML, aberto ou fechado. É o formato mais limpo de entregar par
 * pergunta-resposta para um LLM — e o que espelha o FAQPage do JSON-LD.
 */
export default function Faq({
  title,
  items,
}: {
  title: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="border-t border-[color:var(--line)] bg-ink py-20 md:py-28">
      <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <h2 className="type-h3 max-w-2xl text-balance">{title}</h2>

        <Reveal className="mt-12 flex flex-col" stagger>
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-t border-[color:var(--line)] last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium text-bone transition-colors hover:text-ember md:text-lg">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 text-ember transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-7 text-sm leading-relaxed text-muted md:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
