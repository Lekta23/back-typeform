import { Request, Response } from 'express';
import formService from '../service/formService';

class FormController {
  //POST
  async saveForm(req: Request, res: Response): Promise<void> {    
    await formService.saveForm(req.body);
    res.send(req.body)
  }

  async getForm(req: Request, res: Response): Promise<void> {
    const result = await formService.getForm();
    res.send(result);
  }
}

export default new FormController();
