export type TChatRoleType = 'user' | 'assistant' | 'system';
export type TChatInputMessage = {
  content: string;
  role: ChatRoleType;
};

export type TChatResponse = {
  text: string;
  usage?: {
    outputTokens: number;
    inputTokens: number;
  };
};

export type TStreamHandler = {
  (message: string | null, done: boolean): void;
};
