/**
 * Rejoué à chaque changement de page : un rideau violet bordé d'or
 * se lève, puis la nouvelle page apparaît en douceur (CSS uniquement).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-curtain" aria-hidden />
      <div className="page-enter">{children}</div>
    </>
  );
}
