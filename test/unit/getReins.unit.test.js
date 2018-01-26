const getReins = require('../../src/getReins');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getAllReins', () => {
  test('Replies with something', async () => {
    const response = await getReins.getAllReins();
    expect(response).toBeDefined();
  });
});
