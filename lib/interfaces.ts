export interface Profile {
  id: string;
  name: string;
  online: boolean;
  last_seen: string;
}
export interface Message {
  id: string;
  content: string;
  user_name: string;
  created_at: string;
}
