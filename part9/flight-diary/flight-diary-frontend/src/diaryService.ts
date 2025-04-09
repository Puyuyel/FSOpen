import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const getDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>("/api/diaries");
  return response.data;
};

const addDiaryEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>("/api/diaries", object);
  return response.data;
};

export default { getDiaryEntries, addDiaryEntry };
