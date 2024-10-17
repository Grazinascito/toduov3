import { v4 as uuidv4 } from "uuid";

export const createSession = () => {
  const sessionId = uuidv4();
  // Add logic to store or use this session ID as needed
  console.log(`Session created with ID: ${sessionId}`);
  return sessionId;
};
