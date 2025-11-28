// Mock global de fetch para testes Jest
// Mantém a interface básica de fetch, permitindo sobrescrita em testes específicos.

global.fetch = jest.fn();
