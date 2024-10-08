import { TChatInputMessage, TStreamHandler } from '../types';
import { httpRequest } from '../utils';
import { BaseChat } from './base';
import { fetchEventData } from 'fetch-sse';

const BaseURL = 'https://api.360.cn/v1/chat/completions';

export class QihuChat implements BaseChat {
  chatStream(
    messages: TChatInputMessage[],
    onMessage: TStreamHandler,
    model?: string,
    system?: string
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  platform = 'qihu360';
  public async chat?(
    messages: TChatInputMessage[],
    model?: string,
    system?: string
  ): Promise<string | undefined> {
    if (system) {
      messages = [
        {
          role: 'system',
          content: system,
        },
        ...messages,
      ];
    }

    const input = {
      query: messages
        .map((message) => {
          return `${message.role}: ${message.content}`;
        })
        .join('\n'),
    };
    const payload = {
      appid: '5',
      key: '5f5b9d6b',
      info: JSON.stringify(input),
      userid: '123',
    };
    const res = await httpRequest({
      method: 'POST',
      url: BaseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data?.result) {
      console.error(data);
      throw new Error(data.result);
    }
    return data.result;
  }
}

export default QihuChat;

export const qihuChat = new QihuChat();
