export default function Footer() {
  return (
    <footer className="footer items-center bg-base-200 border-t border-t-base-content border-opacity-40 sticky bottom-0">
      <aside className="items-center p-2">
        <p>© Jonas Pilloud, {new Date().getFullYear()}</p>
      </aside>
    </footer>
  );
}
