import { Request, Response } from 'express';
import { CategoryManager } from 'categories';
import { getOptions } from 'client';

export class CategoriesController {
  constructor() {}

  async addCategory(req: Request, res: Response) {
    const { catName, description } = req.body;
    try {
      const options = getOptions(<null>(<unknown>req.headers));

      const category = (
        await new CategoryManager(options).createCategory(catName, description)
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
      const options = getOptions(<null>(<unknown>req.headers));

      let prevVersion = (await new CategoryManager(options).getCatById(id)).body
        .version;

      const category = (
        await new CategoryManager(options).editCategoryDescription(
          id,
          description,
          prevVersion
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
