export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

export interface Props {
  userName: string;
  channelName: string;
}
