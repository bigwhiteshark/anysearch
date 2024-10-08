import { TChatInputMessage, TStreamHandler } from './../types/chat.d';
export abstract class BaseChat {
  platform?: string;
  abstract chat?(
    messages: TChatInputMessage[],
    model?: string,
    system?: string
  ): Promise<string | undefined>;

  abstract chatStream(
    messages: TChatInputMessage[],
    onMessage: TStreamHandler,
    model?: string,
    system?: string
  ): Promise<void>;
}
