import { Router } from "express";
import * as studentController from "../controller/studentController";

const router = Router();

router.get("/", studentController.getStudents);

export default router;
// import name is determined by the import statement 
// in the file where you use it.