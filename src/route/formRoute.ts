import express, { Router } from 'express';
import formController from '../controller/formController';

const router: Router = express.Router();

router.post('/', formController.saveForm);
router.get('/', formController.getForm);

export default router;
