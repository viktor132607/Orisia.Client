type Props = {
  title: string;
  description: string;
};

export default function AdminSectionPlaceholder({ title, description }: Props) {
  return (
    <main className="admin-section-page">
      <div className="container">
        <span className="admin-section-kicker">ОРИСИЯ · УПРАВЛЕНИЕ</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="admin-section-placeholder">
          <strong>{title}</strong>
          <span>Разделът е подготвен за следващите административни функции.</span>
        </div>
      </div>
    </main>
  );
}
