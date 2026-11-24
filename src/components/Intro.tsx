import { asset } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Écran d'ouverture : le logo se révèle derrière un balayage doré, puis
 * l'écran s'efface (1,9 s). Purement CSS (voir globals.css → .intro).
 * Affiché une seule fois par visite grâce à `introScript`.
 */
export function Intro({ tagline }: { tagline: string }) {
  return (
    <div className="intro" aria-hidden>
      <div className="intro__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(site.logo)} alt="" className="intro__logo" width={320} height={194} />
        <span className="intro__line" />
        <span className="intro__tag text-gold-gradient">{tagline}</span>
      </div>
    </div>
  );
}

export const introScript = `try{var k='enx-intro';if(sessionStorage.getItem(k))document.documentElement.classList.add('intro-seen');else sessionStorage.setItem(k,'1');}catch(e){}`;
