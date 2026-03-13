export function StomaPageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-4xl">
      <span className="tt-page-intro-label">
        {label}
      </span>
      <h1 className="tt-page-intro-title">{title}</h1>
      <p className="tt-page-intro-description">
        {description}
      </p>
    </header>
  );
}
