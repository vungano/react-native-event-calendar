
// Mock console methods to reduce noise
global.console = {
    ...console,
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id) => {
    clearTimeout(id);
};

// Set up fake timers
jest.useFakeTimers();