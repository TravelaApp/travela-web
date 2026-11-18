import Image from "next/image";
import { Icon } from "@/components/icons";
import type { PartnerListing } from "@/data/site";

export function PartnerCard({ partner }: { partner: PartnerListing }) {
  return (
    <article className="rounded-4xl border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <Image
          src={partner.logo}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-2xl object-contain ring-1 ring-line"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold">{partner.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{partner.description}</p>
        </div>
      </div>

      <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
        {partner.location ? (
          <div className="flex items-center gap-3">
            <Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />
            <dd className="text-muted">{partner.location}</dd>
          </div>
        ) : null}
        {partner.contact && partner.phoneHref ? (
          <div className="flex items-center gap-3">
            <Icon name="phone" className="h-4 w-4 shrink-0 text-muted" />
            <dd>
              <a href={partner.phoneHref} className="transition-colors hover:text-ink">
                {partner.contact}
              </a>
            </dd>
          </div>
        ) : null}
        {partner.website ? (
          <div className="flex items-center gap-3">
            <Icon name="external" className="h-4 w-4 shrink-0 text-muted" />
            <dd>
              <a
                href={partner.website}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                {partner.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}