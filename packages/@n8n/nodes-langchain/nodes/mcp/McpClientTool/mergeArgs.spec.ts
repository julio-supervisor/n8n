import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { CompatibilityCallToolResultSchema } from '@modelcontextprotocol/sdk/types.js';
import type { IDataObject } from 'n8n-workflow';

import { createCallTool } from './utils';

jest.mock('@modelcontextprotocol/sdk/client/index.js');

describe('createCallTool', () => {
  it('merges additional arguments with runtime arguments', async () => {
    const callTool = jest.fn().mockResolvedValue({ content: [{ type: 'text', text: 'ok' }] });
    jest.spyOn(Client.prototype, 'callTool').mockImplementation(callTool);
    const client = new Client() as unknown as Client;
    const onError = jest.fn();

    const call = createCallTool('MyTool', client, onError, { a: 1, b: 'x' });
    await call({ b: 'y', c: 2 } as IDataObject);

    expect(callTool).toHaveBeenCalledWith(
      { name: 'MyTool', arguments: { a: 1, b: 'x', c: 2 } },
      CompatibilityCallToolResultSchema,
    );
  });
});
