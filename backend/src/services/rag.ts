import { Models } from '../constant';
import platform from '../platform';
import { TMode, TRagOptions } from '../types';

export class Rag {
  private search?: (...args: any[]) => Promise<any>;
  private chat: (...args: any[]) => Promise<any>;
  private model?: string;
  private stream?: boolean;
  constructor(options: TRagOptions) {
    const { stream = true, model, locally, engine } = options || {};
    const provider: keyof typeof platform = options?.provider;
    if (!model) throw new Error('model is required');
    if (locally && provider) {
      this.chat = platform[provider].chatStream.bind(platform[provider]);
    } else {
      const chat = processModel(model);
      if (!chat) throw new Error('model is not supported');
      this.chat = chat;
    }
    this.model = model;
    this.stream = stream;
    console.info('[query with]:', engine, model);
    console.info('[query with local llm]:', locally);
  }

  async query(
    query: string,
    categories = [],
    mode: TMode = 'simple',
    language = 'all',
    onMessage?: (...args: any[]) => void
  ) {
    return this.chat(query);
  }
}
function processModel(model: string) {
  const targetModel = Models.find((item) => {
    return item.models.includes(model);
  });
  if (targetModel?.platform) {
    const target = platform[targetModel.platform as keyof typeof platform];
    return target.chatStream.bind(target);
  }
}
