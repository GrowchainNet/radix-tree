const crypto = require('crypto')
const RadixTree = require('../')
const cbor = require('borc')
const zlib = require('zlib')

const level = require('level')
const db = level('./testdb')
const DAG = require('../dag.js')
const proof = require('../proofStore.js')

const dag = new DAG(db)

async function main () {
  const tree = new RadixTree({
    dag: dag,
    // root: { '/': 'zdpuArkpWFfw49S1tNLY26YNkHCoKt2CG7rJ6iCaqkcwsGqH7' }
  })

  const entries = 100000 // 5117051
  console.log('entries', entries)
  for (let i = 0; i < entries; i++) {
    const key = crypto.createHash('sha256').update(i.toString()).digest().slice(0, 20)
    await tree.set(key, i)
  }
  console.log('flushing')
  const sr = await tree.flush()
  console.log('done', sr['/'].toString('hex'))

  let proofSize = 0
  let binaryProofSize = 0
  let compressedSize = 0

  for (let i = 0; i < entries; i++) {
    const tree = new RadixTree({
      dag: dag,
      root: {'/': sr['/']}
    })
    const key = crypto.createHash('sha256').update(i.toString()).digest().slice(0, 20)
    await tree.get(key)
    const encoded = cbor.encode(tree.root)
    proofSize += encoded.length
    const binary = proof.encodeProof(tree.root['/'])
    // console.log(JSON.stringify(tree.root, null, 2))
    // console.log(binary)
    binaryProofSize += binary.length

    const gzip = zlib.createGzip()
    gzip.on('data', (data) => {
      compressedSize += data.length
    })
    const promise = new Promise((resolve, reject) => {
      gzip.on('end', () => {
        resolve()
      })
    })
    gzip.end(encoded)
    await promise
  }
  console.log('cbor size', proofSize / entries)
  console.log('cbor compressed size', compressedSize / entries)
  console.log('binary', binaryProofSize / entries)
}
main()