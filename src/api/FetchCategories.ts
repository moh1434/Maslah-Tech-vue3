import { api } from '@/api/axios';
import { CategoryI } from '@/types/Categroy';

async function fetchCategories() {
  const categoriesResponse = await api.get<{ data: CategoryI[] }>(
    '/categories'
  );

  // console.log('categoriesResponse=', categoriesResponse);
  return categoriesResponse;
}

export { fetchCategories };
