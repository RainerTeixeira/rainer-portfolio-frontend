export const postsService = {
  listPosts: jest.fn(() =>
    Promise.resolve({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
    })
  ),
  getPost: jest.fn(() => Promise.resolve(null)),
};

export default { postsService };
