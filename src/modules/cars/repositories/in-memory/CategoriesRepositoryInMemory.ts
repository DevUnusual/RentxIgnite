import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';


class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category as Category;
    }
    async list(): Promise<Category[]> {
        const all = await this.categories;
        return all;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, { name, description });

        this.categories.push(category);
    }

}

export { CategoriesRepositoryInMemory };