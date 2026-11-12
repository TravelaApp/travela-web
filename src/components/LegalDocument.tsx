import { PageHeader } from "@/components/ui";
import type { IconName } from "@/components/icons";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function LegalDocument({
  eyebrow,
  icon,
  title,
  intro,
  updated,
  version,
  sections,
}: {
  eyebrow: string;
  icon?: IconName;
  title: string;
  intro: string;
  updated: string;
  version: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} icon={icon} title={title} intro={intro} />

      <section className="mx-auto max-w-3xl px-5 pb-8">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          Last updated {updated}. Version {version}.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-10">
        <nav aria-label="Contents" className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Contents</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {index + 1}. {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, i) => (
                <p key={`${section.id}-p-${i}`} className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={`${section.id}-b-${i}`}
                      className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                    >
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
