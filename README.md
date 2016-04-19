# Trial.js
simple library to monitoring mouse position and predicting user input

  * No dependency
  * Lightweight (2kb gzipped)
  * Automatically extends `jQuery` and `Zepto` properties
  * `webpack` loader supported

[Examples ]()  
[Usage]()

## APIs

####Trial(selector)
@params selector {String|Node|NodeList|Array{Node}|jQuery object}  
@return {Trial instance}  
@constructor  

Initialize a new Trial instance related to selector, same selector would only have one Trial instance, if `Trial(selector)` called twice with same selector,  the second calling would return the same instance created in first calling.  
`selector` could be query string, NodeList or `$` object  

####Trial.fn.within(options, callback)
@params options {Object}
  


## License
MIT
