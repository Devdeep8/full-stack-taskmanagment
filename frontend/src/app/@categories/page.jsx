import CategoriesTab from "@/components/home/components/categories"
import { GetCategories } from "@/services/get-services"

export default async function CategorySlot() {
    const res = await GetCategories({page: 1 , limit: 10})
    const categories = res.data.data
  return (
    <div>
        <CategoriesTab categories={categories}/>
    </div>
  )
}
