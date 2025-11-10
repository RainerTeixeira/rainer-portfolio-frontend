export type FetchMock = jest.MockedFunction<typeof fetch>;

export function mockFetchOnce(data: any, init: Partial<Response> = {}) {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  (global as any).fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: init.status ?? 200,
    json: async () => (typeof data === 'string' ? JSON.parse(data) : data),
    text: async () => body,
    headers: new Headers({ 'content-type': 'application/json' }),
  } as unknown as Response) as any;
  return global.fetch as unknown as FetchMock;
}

export function mockFetchOnceError(
  status = 500,
  data: any = { message: 'Error' }
) {
  (global as any).fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => data,
    text: async () => (typeof data === 'string' ? data : JSON.stringify(data)),
    headers: new Headers({ 'content-type': 'application/json' }),
  } as unknown as Response) as any;
  return global.fetch as unknown as FetchMock;
}

export function resetFetchMock() {
  (global as any).fetch = undefined;
}
