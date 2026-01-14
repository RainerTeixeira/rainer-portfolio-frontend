export const apiHelpersMock = {
  preparePostForCreate: jest.fn(() => ({ id: 'mock-id', title: 'title', content: 'content' })),
  preparePostForUpdate: jest.fn(() => ({ id: 'mock-id', title: 'updated', content: 'content' })),
  validatePostData: jest.fn(() => ({ valid: true, errors: [] })),
  normalizeContent: jest.fn(() => 'normalized'),
};

export default apiHelpersMock;
