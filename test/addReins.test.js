const addReins = require('../addReins');

afterEach(() => {
  jest.clearAllMocks();
});

describe('validateCommand', () => {
  // test('Handles when a troop value of 0 is given', () => {

  // });
});

describe('parseMessage', () => {
  const username = 'Bob DoB MOB';
  const nickname = 'asdopkasdo';
  const location = 'ahas9asdo';
  const count = 20;
  let sampleMessage;

  beforeEach(() => {
    sampleMessage = {
      content: `!addreins ${count} ${location}`,
      member: {
        nickname,
      },
      author: {
        username,
      },
      reply: jest.fn(),
    };
  });

  test('pulls out the nickname', () => {
    const parsedMessage = addReins.parseMessage(sampleMessage);
    expect(parsedMessage.nickname).toBe(nickname);
  });

  test('pulls out the username when no nickname is present', () => {
    const parsedMessage = addReins.parseMessage(sampleMessage);
    expect(parsedMessage.username).toBe(username);
  });

  test('pulls out the troop count', () => {
    const parsedMessage = addReins.parseMessage(sampleMessage);
    expect(parsedMessage.count).toBe(count);
  });

  test('pulls out the seat of power', () => {
    const parsedMessage = addReins.parseMessage(sampleMessage);
    expect(parsedMessage.location).toBe(location);
  });
});
