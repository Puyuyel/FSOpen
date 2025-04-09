import { JSX, SyntheticEvent, useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import diaryService from "./diaryService";

const App = (): JSX.Element => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .addDiaryEntry({
        date,
        visibility,
        weather,
        comment,
      })
      .then((data) => {
        setDiaryEntries(diaryEntries.concat(data));
      })
      .catch((error) => {
        setError(error.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });

    setComment("");
    setDate("");
    setVisibility("great");
    setWeather("sunny");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addDiaryEntry}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:{" "}
            <label>
              great
              <input
                type="radio"
                value="great"
                checked={visibility === "great"}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
            </label>
            <label>
              {" "}
              good
              <input
                type="radio"
                value="good"
                checked={visibility === "good"}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
            </label>
            <label>
              {" "}
              ok
              <input
                type="radio"
                value="ok"
                checked={visibility === "ok"}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
            </label>
            <label>
              {" "}
              poor
              <input
                type="radio"
                value="poor"
                checked={visibility === "poor"}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
            </label>
          </label>
        </div>
        <div>
          <label>
            Weather:{" "}
            <label>
              sunny
              <input
                type="radio"
                value="sunny"
                checked={weather === "sunny"}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </label>
            <label>
              {" "}
              rainy
              <input
                type="radio"
                value="rainy"
                checked={weather === "rainy"}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </label>
            <label>
              {" "}
              cloudy
              <input
                type="radio"
                value="cloudy"
                checked={weather === "cloudy"}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </label>
            <label>
              {" "}
              stormy
              <input
                type="radio"
                value="stormy"
                checked={weather === "stormy"}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </label>
            <label>
              {" "}
              windy
              <input
                type="radio"
                value="windy"
                checked={weather === "windy"}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
            </label>
          </label>
        </div>
        <div>
          <label>
            Comment:{" "}
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
