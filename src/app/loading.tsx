export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0a0a0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        background: 'linear-gradient(to bottom right, #34d399, #059669)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 20,
        color: '#000',
        marginBottom: 16,
        animation: 'logoPulse 1.5s ease-in-out infinite',
      }}>9M</div>
      <h2 style={{
        color: '#34d399',
        fontSize: 20,
        fontWeight: 700,
        margin: 0,
      }}>9mach Trade</h2>
      <p style={{
        color: '#6b7280',
        fontSize: 13,
        marginTop: 4,
      }}>Loading markets...</p>
      <div style={{
        marginTop: 14,
        width: 40,
        height: 40,
        border: '3px solid rgba(52, 211, 153, 0.15)',
        borderTopColor: '#34d399',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
