import { assetCategories as categories } from '@/lib/assets'
import { allAssets } from '@/lib/assets'
import { success, error } from '@/lib/api/response'

export async function GET() {
  try {
    const categoriesWithCount = categories.map((cat) => {
      const count = allAssets.filter(
        (asset) => asset.category.toLowerCase() === cat.id.toLowerCase()
      ).length
      return {
        name: cat.name,
        count,
      }
    })

    return success({ categories: categoriesWithCount })
  } catch (err) {
    return error('Failed to fetch categories', 500)
  }
}
