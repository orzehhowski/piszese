export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-600">
      &copy; {new Date().getFullYear()} Orzehhowski's piszesb. Published przeze mnie with <a href="https://mikr.us" target="_blank">mikrusek</a>.
    </footer>
  );
}
