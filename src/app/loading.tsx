export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A88A] to-[#008F74] flex items-center justify-center font-bold text-white text-lg">
          D
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">DWEX</h2>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
        <div className="w-8 h-8 border-2 border-[#00A88A]/20 border-t-[#00A88A] rounded-full animate-spin" />
      </div>
    </div>
  )
}
