const app = require('../app');
const addReins = require('../addReins');

jest.mock('../addReins', () => ({ addReins: jest.fn() }));

const mockAddReins = jest.fn();
beforeEach(() => {
  addReins.addReins.mockImplementationOnce(mockAddReins);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Recognizes the phrase !addReins', () => {
  const message = {
    content: '!addreins',
  };

  app.checkMessage(message);
  expect(mockAddReins.mock.calls.length).toBe(1);
});

test('Recognizes the phrase !addReins no matter the capitalization', () => {
  const message = {
    content: '!aDdReInS',
  };

  app.checkMessage(message);
  expect(mockAddReins.mock.calls.length).toBe(1);
});
