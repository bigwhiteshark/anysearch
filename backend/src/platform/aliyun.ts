import { TChatInputMessage, TStreamHandler } from '../types';
import { httpRequest } from '../utils';
import { BaseChat } from './base';
import { fetchEventData } from 'fetch-sse';

const BaseURL = 'https://dashscope.aliyuncs.com/api/v1/';
const APIS = {
  qwen: 'services/aigc/text-generation/generation',
  background: 'services/aigc/background-generation/generation',
  task: 'tasks/%s',
  embedding: 'services/embeddings/text-embedding/text-embedding',
};

export class AliyunChat implements BaseChat {
  private key?: string;
  platform = 'aliyun';
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
      messages,
    };

    const url = `${BaseURL}${APIS.qwen}`;
    const payload = {
      model,
      input,
    };

    const res = await httpRequest({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.key}`,
      },
      data: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data?.message) {
      console.error(data);
      throw new Error(data.message ?? 'bad request.');
    }

    return data.output.text;
  }

  chatStream(
    messages: TChatInputMessage[],
    onMessage: TStreamHandler,
    model?: string,
    system?: string
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const aliyun = new AliyunChat();
