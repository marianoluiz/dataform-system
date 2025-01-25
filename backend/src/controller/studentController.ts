import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const studentInfos = await studentService.getStudents();

    res.json(studentInfos);
    // res.json stringifies the javascript object
  } catch (err) {
    res.status(500).json({ err: (err as Error).message });
  }
}