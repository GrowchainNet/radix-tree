const IPFS = require('ipfs')
const crypto = require('crypto')
const RadixTree = require('../')
const cbor = require('borc')
const zlib = require('zlib')

// start ipfs
const node = new IPFS({
  start: false,
  repo: './ipfs-repo'
})

node.on('ready', async () => {
  const tree = new RadixTree({
    dag: node.dag,
    // root: { '/': 'zdpuArkpWFfw49S1tNLY26YNkHCoKt2CG7rJ6iCaqkcwsGqH7' }
  })

  const entries = 10000 //5117051
  console.log('entries', entries)
  for (let i = 0; i < entries; i++) {
    const key = crypto.createHash('sha256').update(i.toString()).digest().slice(0, 20)
    await tree.set(key, i)
  }
  console.log('flushing')
  const sr = await tree.flush()
  console.log('done', sr)

  let proofSize = 0
  let compressedSize = 0

  const gzip = zlib.createGzip()
  gzip.on('data', (data) => {
    compressedSize += data.length
  })

  const numOfKeys = 3
  for (let i = 0; i < numOfKeys; i++) {
    const key = crypto.createHash('sha256').update(i.toString()).digest().slice(0, 20)
    await tree.get(key)
  }

  const encoded = cbor.encode(tree.root)
  proofSize += encoded.length

  const promise = new Promise((resolve, reject) => {
    gzip.on('end', () => {
      resolve()
    })
  })
  gzip.end(encoded)
  await promise
  console.log('cbor size', proofSize)
  console.log('compressed size', compressedSize)
})