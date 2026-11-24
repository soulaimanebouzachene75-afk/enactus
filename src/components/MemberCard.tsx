import Image from "@/components/Img";
import { UserRound } from "lucide-react";
import type { Member } from "@/content/team";
import { tr, type Locale } from "@/i18n/config";
import { Placeholder } from "./ui";
import { Tilt } from "./Tilt";

export function MemberCard({ member, locale, placeholderLabel }: { member: Member; locale: Locale; placeholderLabel: string }) {
  return (
    <article className="group">
      <Tilt glare={false}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-bone ring-1 ring-ink/5 transition duration-700 group-hover:shadow-[0_30px_70px_-30px_rgba(132,22,138,0.55)]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name} — ${tr(member.role, locale)}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 border-2 border-dashed border-ink/15 text-ink/30">
            <UserRound className="h-16 w-16" strokeWidth={1} aria-hidden />
            <Placeholder>{placeholderLabel}</Placeholder>
          </div>
        )}
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" aria-hidden />
        <span className="tilt-glare" aria-hidden />
      </div>
      </Tilt>
      <h3 className="mt-5 font-display text-2xl">{member.placeholder ? placeholderLabel : member.name}</h3>
      <p className="mt-1 text-sm text-ink/60">{tr(member.role, locale)}</p>
    </article>
  );
}
