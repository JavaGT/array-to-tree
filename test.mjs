import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import toTree from './index.mjs';

describe('toTree', () => {
  it('should return a root directory for empty array', () => {
    const result = toTree([]);
    assert.strictEqual(result.type, 'directory');
    assert.deepStrictEqual(result.children, {});
    assert.deepStrictEqual(result.route, []);
  });

  it('should handle a flat array (single file, no directories)', () => {
    const result = toTree([['lit.txt']]);
    assert.strictEqual(result.type, 'directory');
    assert.ok(result.children['lit.txt']);
    assert.strictEqual(result.children['lit.txt'].type, 'file');
    assert.deepStrictEqual(result.children['lit.txt'].route, ['lit.txt']);
  });

  it('should build a nested tree from multiple routes', () => {
    const result = toTree([
      ['foo', 'bar.txt'],
      ['foo', 'rab.txt'],
      ['foo', 'baz', 'other.txt']
    ]);

    // root -> foo directory
    assert.ok(result.children['foo']);
    assert.strictEqual(result.children['foo'].type, 'directory');

    // foo -> bar.txt file
    assert.ok(result.children['foo'].children['bar.txt']);
    assert.strictEqual(result.children['foo'].children['bar.txt'].type, 'file');
    assert.deepStrictEqual(result.children['foo'].children['bar.txt'].route, ['foo', 'bar.txt']);

    // foo -> rab.txt file
    assert.ok(result.children['foo'].children['rab.txt']);
    assert.strictEqual(result.children['foo'].children['rab.txt'].type, 'file');

    // foo -> baz -> other.txt
    assert.ok(result.children['foo'].children['baz']);
    assert.strictEqual(result.children['foo'].children['baz'].type, 'directory');
    assert.ok(result.children['foo'].children['baz'].children['other.txt']);
    assert.strictEqual(result.children['foo'].children['baz'].children['other.txt'].type, 'file');
  });

  it('should handle orphan-like routes (parent created implicitly)', () => {
    const result = toTree([
      ['a', 'b', 'c.txt'],
      ['a', 'b.txt']
    ]);
    assert.ok(result.children['a']);
    assert.ok(result.children['a'].children['b']);
    assert.ok(result.children['a'].children['b'].children['c.txt']);
    assert.ok(result.children['a'].children['b.txt']);

    // 'b' is both a directory (for c.txt) and a file would conflict, but
    // the implementation always creates directory first if step isn't last
    // and only creates file on the final index, so a/b.txt is a file
    // while a/b/c.txt makes b a directory. Since b.txt is created as
    // a file under a/, and b/ is a directory under a/, they coexist
    // as siblings under a/ (one is a file, one is a directory).
    assert.strictEqual(result.children['a'].children['b.txt'].type, 'file');
    assert.strictEqual(result.children['a'].children['b'].type, 'directory');
  });
});
