import { allAssets } from '@/lib/assets'
import { success, error } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''

    if (!q) {
      return success({ results: [] })
    }

    const query = q.toLowerCase()
    const results = allAssets
      .filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query)
      )
      .slice(0, 10)

    return success({ results })
  } catch (err) {
    return error('Failed to search assets', 500)
  }
}
