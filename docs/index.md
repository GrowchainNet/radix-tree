## constructor

[index.js:18-25][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L18-L25 "Source code on GitHub"]

**Parameters**

-   `opts`  
    -   `opts.root`  {object} a merkle root to a radix tree. If none, RadixTree will create an new root.
    -   `opts.db`  {object} a level db instance; alternatively, `opts.graph` can be used
    -   `opts.decoder`  {object} a cbor decoder

## root

[index.js:31-33][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L31-L33 "Source code on GitHub"]

the root of the tree

Type: [Buffer][2]

## get

[index.js:44-48][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L44-L48 "Source code on GitHub"]

gets a value given a key

**Parameters**

-   `key` **any** 

Returns **[Promise][1]** 

## set

[index.js:98-101][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L98-L101 "Source code on GitHub"]

stores a value at a given key returning the tree node that the value was saved in

**Parameters**

-   `key` **any** 
-   `value`  

Returns **[Promise][1]** 

## delete

[index.js:150-153][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L150-L153 "Source code on GitHub"]

smContainer.js deletes a value at a given key

**Parameters**

-   `key` **any** 

Returns **[Promise][1]** 

## done

[index.js:212-218][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L212-L218 "Source code on GitHub"]

returns a promise that resolve when the tree is done with all of its writes

Returns **[Promise][1]** 

## flush

[index.js:234-238][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L234-L238 "Source code on GitHub"]

creates a merkle root for the current tree and stores the data persistently

Returns **[Promise][1]** 

## rootExists

[index.js:250-258][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L250-L258 "Source code on GitHub"]

Checks if a given root exists or not

**Parameters**

-   `root` **[Buffer][2]** 

Returns **[Promise][1]&lt;[boolean][3]>** 

## emptyTreeState

[index.js:279-281][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L279-L281 "Source code on GitHub"]

returns the state of an empty tree

## ArrayConstructor

[index.js:287-289][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L287-L289 "Source code on GitHub"]

returns an Uint1Array constructor which is used to represent keys

Returns **[object][4]** 

## getMerkleLink

[index.js:296-298][https://github.com/GrowchainNet/radix-tree/blob/master/index.js#L296-L298 "Source code on GitHub"]

returns a merkle link for some given data

**Parameters**

-   `data` **[Buffer][2]** the data which you would like to hash

Returns **[Buffer][2]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[2]: https://nodejs.org/api/buffer.html

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object