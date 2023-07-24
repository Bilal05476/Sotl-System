import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");
const Hello = () => {
  const [re, setre] = useState("");
  useEffect(() => {
    socket.on("receive", (data) => setre(data.message));
  }, [socket]);
  return (
    <div>
      <button
        onClick={() => {
          socket.emit("send", { message: "Hello World" });
        }}
      >
        Send
      </button>
      <h2>{re}</h2>
    </div>
  );
};

export default Hello;
