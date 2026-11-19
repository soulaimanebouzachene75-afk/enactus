import { cn } from "@/lib/utils";

/**
 * Apparition au défilement — sans dépendre de React.
 * Le contenu est TOUJOURS présent et visible dans le HTML. Le petit script
 * de `revealScript` (dans le layout) ajoute l'animation seulement si le
 * navigateur la gère. Si le JavaScript tarde ou échoue (téléphone ancien,
 * navigateur intégré à WhatsApp/Instagram…), tout reste lisible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const Tag = as;
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ ["--reveal-y" as string]: `${y}px`, transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </Tag>
  );
}

/** Script autonome injecté dans <head>. */
export const revealScript = `(function(){try{
var d=document.documentElement;
if(!('IntersectionObserver' in window)||!('MutationObserver' in window))return;
d.classList.add('js-reveal');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -40px 0px'});
function scan(){var l=document.querySelectorAll('.reveal:not([data-seen])');for(var i=0;i<l.length;i++){l[i].setAttribute('data-seen','');io.observe(l[i]);}}
new MutationObserver(scan).observe(d,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',scan);
// Filet de sécurité : tout s'affiche au bout de 4 s quoi qu'il arrive.
setTimeout(function(){var l=document.querySelectorAll('.reveal:not([data-in])');for(var i=0;i<l.length;i++){var r=l[i].getBoundingClientRect();if(r.top<innerHeight)l[i].setAttribute('data-in','');}},4000);
}catch(e){document.documentElement.classList.remove('js-reveal');}})();`;
