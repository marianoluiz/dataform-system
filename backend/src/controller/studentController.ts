import { Request, Response } from "express";
import * as studentService from "../services/studentService";

// this where we parse json and send success message

export const getStudents = async (req: Request, res: Response) => {
  try {
    const studentInfos = await studentService.getStudents();

    res.json(studentInfos);
    // res.json stringifies the javascript object
  } catch (err) {
    res.status(500).json({ err: (err as Error).message });
    // this is forcing ts to assume err as error but it is technically an unknown type
    // cuz its always not error in js
    // guy told me to always throw error
  }
}

export const addStudent = async (req: Request, res: Response) => {
  try {
      const newStudent = req.body;
      await studentService.addStudent(newStudent);
      res.status(201).json({message: `Student ${newStudent.l_name}, ${newStudent.f_name} added successfully`});
  } catch (err) {
    res.status(500).json({ err: (err as Error).message });
  }
}