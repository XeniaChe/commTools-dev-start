import { Request, Response } from 'express';
import { CategoryManager } from 'categories';
import { getOptions } from 'client';

export class CategoriesController {
  #CategoryManager;
  #options = getOptions();
  constructor() {
    this.#CategoryManager = new CategoryManager(this.#options);
  }

  async addCategory(req: Request, res: Response) {
    const { catName, description } = req.body;
    try {
      // const options = getOptions(<null>(<unknown>req.headers));

      const category = (
        await this.#CategoryManager.createCategory(catName, description)
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
      // const options = getOptions(<null>(<unknown>req.headers));

      let version = (await this.#CategoryManager.getCatById(id)).body.version;

      const category = (
        await this.#CategoryManager.editCategoryDescription(
          id,
          description,
          version
        )
      ).body;

      res.json({ category });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error editing category. Cause: ${msg}` });
    }
  }
}
