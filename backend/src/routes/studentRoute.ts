import { Router } from "express";
import * as studentController from "../controller/studentController";

const router = Router();

router.get("/", studentController.getStudents);
router.post("/", studentController.addStudent);
router.put("/", studentController.updateStudent);
// from path vars paramter
router.delete("/:p_id", studentController.removeStudent);

export default router;
// import name is determined by the import statement 
// in the file where you use it.