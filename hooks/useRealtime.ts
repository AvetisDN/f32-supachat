"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Message, Profile } from "@/lib/interfaces";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) {
        console.error("Error fetching messages");
      } else {
        setMessages(data || []);
      }

      setLoading(false);
    };

    const setupSubscription = () => {
      channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages((prev) => [...prev, newMessage]);
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "messages" },
          (payload) => {
            const deletedId = payload.old.id;
            setMessages((prev) => prev.filter((item) => item.id !== deletedId));
          }
        )
        .subscribe();
    };

    fetchMessages();
    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return { messages, loading };
}
export function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<Profile[]>([]);

  useEffect(() => {
    let channel: RealtimeChannel;

    const fetchOnlineUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("online", true);

      if (error) {
        console.error("Error fetching users");
      } else {
        setOnlineUsers(data || []);
      }
    };

    const setupSubscription = () => {
      channel = supabase
        .channel("profiles")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "profiles" },
          (payload) => {
            if (payload.eventType === "UPDATE") {
              const updatedProfile = payload.new as Profile;
              setOnlineUsers((prev) => {
                const filtered = prev.filter(
                  (item) => item.id !== updatedProfile.id
                );
                return updatedProfile.online
                  ? [...filtered, updatedProfile]
                  : filtered;
              });
            }
          }
        )
        .subscribe();
    };

    fetchOnlineUsers();
    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return onlineUsers;
}
