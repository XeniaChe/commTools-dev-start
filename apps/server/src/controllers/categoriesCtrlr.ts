import { Request, Response } from 'express';
import { CategoryManager } from 'categories';

export class CategoriesController {
  catManager: CategoryManager;

  constructor() {
    this.catManager = new CategoryManager();
  }

  async addCategory(req: Request, res: Response) {
    const { catName, description } = req.body;

    try {
      const category = (
        await this.catManager.createCategory(catName, description)
      ).body;

      res.json({ category });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating category. Cause: ${msg}` });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { description } = req.body;

    try {
      let version = (await this.catManager.getCatById(id)).body.version;

      const category = (
        await this.catManager.editCategoryDescription(id, description, version)
      ).body;

      res.json({ category });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error editing category. Cause: ${msg}` });
    }
  }
}
