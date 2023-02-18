import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

function App() {
  const apiKey = "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";

  const [searchTerm, setsearchTerm] = useState(" ");
  const [value, setValue] = useState("");

  const client = axios.create({
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  });

  const params = {
    prompt: searchTerm,
    model: "text-davinci-003",
    max_tokens: 4000,
    temperature: 0,
  };

  async function fetchData(key) {
    const result = await client.post(
      "https://api.openai.com/v1/completions",
      key
    );

    setValue(result.data.choices[0].text);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Ask me anything ?"
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
          />
          <button
            onClick={() => {
              fetchData(params);
            }}
          >
            Search
          </button>
        </div>
        <div className="output">
          <div className="value">
            <Typewriter
              options={{
                pauseFor: 80000,
                strings: [value],
                autoStart: true,
                delay: 20,
              }}
            />
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright © {new Date().getFullYear()} All rights reserved | Made by
            Aman{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
