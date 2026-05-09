export default function Footer() {
  return (
    <div className="D D3">
      <footer className="footer">
        <div className="footer-about">
          <h4 className="footer-heading">About Us</h4>
          <p className="footer-text">
            Aroyan Muslim School is committed to nurturing students with strong Islamic values
            while providing quality Western education.
          </p>
        </div>

        <div className="social-icons">
          <a
            href="https://wa.me/YOUR_SCHOOL_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.003 2h-.006C8.266 2 2 8.264 2 16c0 3.066 1.01 5.9 2.72 8.16L2.96 27.16l3.204-1.024A13.94 13.94 0 0 0 16.003 30C23.734 30 30 23.734 30 16S23.734 2 16.003 2zm8.104 21.384c-.34.96-1.684 1.76-2.752 1.996-.74.16-1.704.284-4.952-1.064-4.156-1.724-6.832-5.944-7.04-6.216-.2-.272-1.66-2.212-1.66-4.22s1.048-2.996 1.416-3.408c.34-.38.74-.476.988-.476.248 0 .496.004.712.012.228.01.536-.088.84.64.312.74 1.06 2.588 1.152 2.776.092.188.156.408.032.656-.124.252-.188.408-.376.628-.188.22-.396.492-.564.66-.188.188-.384.392-.164.768.22.376.98 1.612 2.104 2.612 1.448 1.288 2.668 1.688 3.044 1.876.376.188.596.16.816-.096.22-.26.94-1.096 1.192-1.472.252-.376.5-.312.844-.188.344.124 2.184 1.032 2.56 1.22.376.188.628.28.72.436.092.156.092.904-.248 1.864z" fill="#25D366"/>
            </svg>
          </a>
          <a
            href="https://t.me/YOUR_SCHOOL_CHANNEL"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon telegram"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.768 9.588l-2.18 10.264c-.16.72-.588.896-1.192.556l-3.296-2.428-1.588 1.528c-.176.176-.324.324-.664.324l.236-3.36 6.18-5.584c.272-.236-.056-.368-.416-.132l-7.64 4.808-3.288-1.024c-.716-.224-.732-.716.148-1.06l12.856-4.956c.592-.216 1.108.144.916 1.068z" fill="#0088cc"/>
            </svg>
          </a>
        </div>

        <p className="footer-contact">Contact: info@aroyanschool.edu | +234-XXX-XXX-XXXX</p>
        <p className="footer-copyright">&copy; 2026 Aroyan Muslim School</p>
      </footer>
    </div>
  )
}
