"use client";

import { Speaker, VolumeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [audiotext, setAudioText] = useState<string>("");

  function getAudio() {
    fetch("http://localhost:5000/synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: audiotext }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="bg-transparent h-full w-full flex items-center justify-center ">
      <div className="flex flex-col w-[80%] mt-12">
        <textarea
          placeholder="Enter your text"
          className="bg-slate-600 border p-2"
          onChange={(e) => setAudioText(e.target.value)}
        />
        <button
          className="p-3 bg-emerald-600 max-w-xs text-center self-center rounded-lg flex mt-5"
          onClick={() => {
            getAudio();
          }}
        >
          <VolumeIcon />
          Speak
        </button>
      </div>
    </div>
  );
}
