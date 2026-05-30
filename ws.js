import { WebSocketServer } from "ws";

export const startWSServer = () => {
  // Create a WebSocket server on port 8080
  const wss = new WebSocketServer({ port: 9229 });

  // Connection event handler

  wss.on("error", (e) => {
    console.log(e);
  });
  return wss;
};
