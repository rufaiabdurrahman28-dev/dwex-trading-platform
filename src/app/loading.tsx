export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F8F9F5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: '3px solid #2D5F3F',
        boxShadow: '0 4px 16px rgba(45, 95, 63, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        <span style={{ color: '#2D5F3F', fontSize: 24, fontWeight: 700 }}>A</span>
      </div>
      <h2 style={{
        color: '#2D5F3F',
        fontSize: 20,
        fontWeight: 700,
        margin: 0,
      }}>Aroyan Muslim School</h2>
      <p style={{
        color: '#C9A961',
        fontSize: 14,
        margin: '6px 0 0',
      }}>Loading...</p>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}
