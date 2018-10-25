import { cache } from '../src/cache'; 

test('cache', () => {
  const typeCache = cache();
  typeCache('name', 'beth');

  expect(typeCache('name', 'beth')).toBe('beth');
});