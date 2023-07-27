import { Request, Response } from 'express';
import { CategoryManager } from 'categories';
import {
  CategoryUpdateAction,
  CategoryChangeSlugAction,
  CategoryChangeOrderHintAction,
} from '@commercetools/platform-sdk';

enum ActionTypes {
  updtDescription = 'changeSlug',
  cahngeOrderHint = 'changeOrderHint',
}

export class CategoriesController {
  catManager: CategoryManager;

  constructor() {
    this.catManager = new CategoryManager();
  }

  async addCategory(req: Request, res: Response) {
    const { catName, description }: { catName: string; description: string } =
      req.body;

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

  async updateCategoryDescription(req: Request, res: Response) {
    const { id } = req.params;
    const { description }: { description: string } = req.body;

    try {
      const { version } = (await this.catManager.getCatById(id)).body;

      const category = (
        await this.catManager.editCategoryDescription(id, description, version)
      ).body;

      res.json({ category });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({
        error: `Error updating category's description. Cause: ${msg}`,
      });
    }
  }

  async genericCategoryUpdate(req: Request, res: Response) {
    const { id } = req.params;
    let actionPayload: CategoryUpdateAction = req.body.actionPayload;

    try {
      const { version } = (await this.catManager.getCatById(id)).body;

      if (actionPayload.action === ActionTypes.updtDescription) {
        actionPayload = {
          action: ActionTypes.updtDescription,
          slug: actionPayload.slug,
        } as CategoryChangeSlugAction;
      }

      if (actionPayload.action === ActionTypes.cahngeOrderHint) {
        actionPayload = {
          action: ActionTypes.cahngeOrderHint,
          orderHint: req.body.actionPayload.orderHint as string,
        } as CategoryChangeOrderHintAction;
      }

      const category = (
        await this.catManager.editCategory(id, version, actionPayload)
      ).body;

      res.json({ category });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error updating category. Cause: ${msg}` });
    }
  }
}
