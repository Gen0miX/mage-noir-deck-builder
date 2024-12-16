export default function Footer() {
  return (
    <footer className="footer items-center bg-base-100 min-h-8 border-t border-t-secondary border-opacity-40">
      <aside className="items-center p-2">
        <p>© Jonas Pilloud, {new Date().getFullYear()}</p>
      </aside>
    </footer>
  );
}
