# opencode-tokens-per-second

This is a plugin for OpenCode that measures and displays tokens per second for model responses. You can use it to test and compare the speed of various models. Here is what's measured:

- **Tokens per second**: Calculated as `output_tokens / (time.completed - time.created)` for each assistant message
- **Active only**: Only counts time when the model is producing output, not tool execution or idle periods
- **Per-message**: Reports rate for each model response individually

It shows a toast notification when each assistant message completes.

## Demo

https://github.com/user-attachments/assets/8392db02-0ede-40d0-9eca-ed228cdac1b4

## Installation

Add the plugin to `~/.config/opencode/opencode.jsonc`:

```json
{
  "plugin": ["opencode-tokens-per-second@latest"]
}
```
