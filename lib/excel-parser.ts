import * as XLSX from "xlsx";
import { QuizQuestion, ExcelRow } from "../types/quiz";

export const parseExcelFile = async (file: File): Promise<QuizQuestion[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

        const questions: QuizQuestion[] = jsonData.map((row, index) => ({
          id: index + 1,
          question: row.Question,
          options: [
            row["Option A"],
            row["Option B"],
            row["Option C"],
            row["Option D"],
          ],
          correctAnswer: row.Answer,
          points: Number(row.POINT) || 0,
        }));

        resolve(questions);
      } catch (error) {
        reject(new Error("Failed to parse Excel file. Please check the format."));
      }
    };

    reader.onerror = () => reject(new Error("File reading error."));
    reader.readAsBinaryString(file);
  });
};
