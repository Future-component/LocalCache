import { storage } from '../src/storage';

const cacheStorage = storage('prefix', sessionStorage);

test('storage get', () => {
  cacheStorage.set('xq', JSON.stringify({ name: 'beth' }));
  // expect(JSON.parse(cacheStorage.get('xq'))).toEqual({ name: 'beth' });
  expect(JSON.parse(cacheStorage.get('xq'))).toEqual(null);
})

test('storage clear', () => {
  cacheStorage.clear();
  expect(cacheStorage.getAll()).toEqual({})
})

test('storage remove', () => {
  cacheStorage.set('xq', JSON.stringify({ name: 'beth' }), 1);
  cacheStorage.remove('xq');
  // expect(cacheStorage.get('xq')).toEqual('');
  expect(cacheStorage.get('xq')).toEqual(null);
})