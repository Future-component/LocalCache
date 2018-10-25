import { cookie } from '../src/cookie';

const cacheCookie = cookie('prefix');

test('cookie get', () => {
  cacheCookie.set('xq', JSON.stringify({ name: 'beth' }), 1);
  expect(JSON.parse(cacheCookie.get('xq'))).toEqual({ name: 'beth' });
})

test('cookie clear', () => {
  cacheCookie.clear();
  expect(cacheCookie.getAll()).toEqual({})
})

test('cookie remove', () => {
  cacheCookie.set('xq', JSON.stringify({ name: 'beth' }), 1);
  cacheCookie.remove('xq');
  expect(cacheCookie.get('xq')).toBe('');
})