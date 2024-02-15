import express, {Router} from 'express';
import * as adminController from '../controllers/adminController';
const admin :Router =express.Router();
admin.post("/log-in", adminController.Record_admin);
export default admin;