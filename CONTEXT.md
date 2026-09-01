# opencode-tokens-per-second

A plugin for OpenCode that measures and displays tokens per second for model responses.

## Overview

This plugin tracks the rate at which the selected model generates output tokens, excluding idle time (tool use, waiting, etc.).

## What We Measure

- **Tokens per second**: Calculated as `output_tokens / (time.completed - time.created)` for each assistant message
- **Active only**: Only counts time when the model is producing output, not tool execution or idle periods
- **Per-message**: Reports rate for each model response individually

## Display

- Shows toast notification when each assistant message completes
- Displays: tokens/sec, total output tokens, model name
- Non-intrusive temporary notification

## Design Decisions

| Decision | Choice |
|----------|--------|
| Measurement scope | Per-message rate only |
| Time tracking | Uses `time.created` and `time.completed` from AssistantMessage |
| Display method | Toast notification |
| Metrics shown | tokens/sec + output tokens + model name |
| Configuration | No config for v1 |

## Events Used

- `message.updated`: Captures assistant message completion with token counts and timing
- `session.status`: Optional future use for session-level metrics

## Implementation Notes

The plugin uses the OpenCode plugin SDK to hook into message events and calculate rates from the timing data embedded in assistant messages.
