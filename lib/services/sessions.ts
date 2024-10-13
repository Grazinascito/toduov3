"use client";

import { supabase } from "./supabase"; // Ensure you have the Supabase client initialized
// Define types and interfaces


// Session interface
interface Session {
  id: string;
  host_user_id: string;
  session_title: string;
  start_time?: string;
  end_time?: string;
}

// Participant interface
interface Participant {
  id: string;
  session_id: string;
  user_id: string;
  role: "host" | "guest";
  joined_at?: string;
}

export const createSession = async (
  hostUserId: string,
  sessionTitle: string
): Promise<Session | null> => {
  try {
    const { data, error } = await supabase
      .from("sessions")
      .insert([{ host_user_id: hostUserId, session_title: sessionTitle }]);

    if (error) throw error;

    // if (data && data.length > 0) {
    //   // Add the host to the participants table
    //   await addParticipant(data[0].id, hostUserId, "host");
    //   return data[0];
    // }
    return null;
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
};
export const addParticipant = async (
  sessionId: string,
  userId: string,
  role: "host" | "guest" = "guest"
): Promise<Participant | null> => {
  try {
    const { data, error } = await supabase
      .from("participants")
      .insert([{ session_id: sessionId, user_id: userId, role }]);

    if (error) throw error;
    return data ? data[0] : null;
  } catch (error) {
    console.error("Error adding participant:", error);
    return null;
  }
};
