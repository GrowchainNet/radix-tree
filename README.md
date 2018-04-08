# Synopsis

:evergreen_tree:  This implements a binary merkle radix tree. The point of using a binary radix
tree is that it generates smaller proof size then trees with larger radixes.
This tree is well suited for storing large dictionaries of fairly random keys.
And is optimized for storing keys of the same length. If the keys are not
random better performance can be archived by hashing them first. It builds on
top of [ipld-graph-builder](https://github.com/ipld/js-ipld-graph-builder)
and the resulting state and proofs are generated using it.

## Usage

```javascript
const RadixTree = require('radix-tree')
const level = require('level')
const db = level('./tempdb')

async function main () {
  const prover = new RadixTree({
    db: db
  })

  await prover.set('test', Buffer.from('value'))
  await prover.set('doge', Buffer.from('coin'))
  await prover.set('cat', Buffer.from('dog'))
  await prover.set('monkey', Buffer.from('wrench'))

  // create a merkle root and save the tree
  const merkleroot = await prover.flush()

  // start a new Instance with the root
  const verifier = new RadixTree({
    db: db,
    root: merkleroot
  })

  const result = await verifier.get('monkey')
  console.log(result.value.toString())
}

main()
```
## API
['./docs/'](./docs/index.md)

## Specification
['./docs/spec.md'](./docs/spec.md)

## Benchmarks
The result of the benchmarks show that the binary radix tree produces proofs on
average 67% small then the Ethereum Trie with 100000 keys stored.

['./benchmarks/benchmarks.md'](./benchmark/results.md)