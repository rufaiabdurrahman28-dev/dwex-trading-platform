import { allAssets, assetCategories as categories } from '@/lib/assets'
import { success, error } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    let filtered = [...allAssets]

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(
        (asset) => asset.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Search by symbol or name if provided
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query)
      )
    }

    const total = filtered.length
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return success({
      assets: paginated,
      total,
      page,
      limit,
      categories,
    })
  } catch (err) {
    return error('Failed to fetch market prices', 500)
  }
}
