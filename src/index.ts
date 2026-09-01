import type { Plugin } from '@opencode-ai/plugin';
import type { EventMessageUpdated } from '@opencode-ai/sdk';
import type { AssistantMessage } from '@opencode-ai/sdk';

export const tokensPerSecond: Plugin = async ({ client }) => {
  return {
    event: async (input) => {
      if (input.event.type !== 'message.updated') {
        return;
      }

      const message = (input.event as EventMessageUpdated).properties.info as AssistantMessage;

      if (message.role !== 'assistant') {
        return;
      }

      const completed = message.time.completed;

      if (!completed) {
        return;
      }

      const durationMs = completed - message.time.created;

      if (durationMs <= 0) {
        return;
      }

      const tokens = message.tokens.output;
      const durationSec = durationMs / 1000;
      const tokensPerSecond = tokens / durationSec;

      await client.tui.showToast({
        body: {
          message: `${tokensPerSecond.toFixed(2)} tokens/sec | ${tokens} output tokens | ${message.providerID}/${message.modelID}`,
          variant: 'success',
        },
      });
    },
  };
};
