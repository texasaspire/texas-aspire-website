export function Eyebrow({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="ta-eyebrow">
      <span className="num">{num}</span>
      <span>{children}</span>
    </div>
  );
}
