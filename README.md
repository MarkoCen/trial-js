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

Initialize a new Trial instance related to selector, same selector would only have one Trial instance, if `Trial(selector)` be called twice with same selector,  the second calling would return the same instance created in first calling.  
`selector` could be query string, NodeList or `$` object  
  
  
####Trial.fn.within(options, callback)
@params options {Object}  
@params callback {Function}  
@return {Trial instance}  

This method setup a circular area on matched element, when mouse pointer moving within this area, event handler would be called  
  
![Distance options](https://raw.githubusercontent.com/MarkoCen/markocen.github.io/master/trialjs/img/distance.jpg)  
  
*options*:  
  `distance` {Number} : determine the radius of the circular area  
  `cord` {String} : determine the center of the circular area, could be `center`, `topLeft`, `topCenter`, `topRight`, `centerLeft`, `centerRight`, `bottomLeft`, `bottomCenter`, `bottomRight`  
  
![Coordinate options](https://raw.githubusercontent.com/MarkoCen/markocen.github.io/master/trialjs/img/cord.jpg)  

*callback*  
An event handler to be called when mouse pointer moving within the circular area, arguments:  
`distance` {Number} : current distance between mouse pointer and matched element
`ele` {Node} : matched element
`event` {Event} : mousemove event  
  
  
####Trial.fn.enter(options, callback)
@params options {Object}  
@params callback {Function}  
@return {Trial instance}  

same as `Trial.fn.within`, but only call the event handler when mouse pointer enter the circular area  
*options*:  
  `distance` {Number} : determine the radius of the circular area  
  `cord` {String} : determine the center of the circular area, could be `center`, `topLeft`, `topCenter`, `topRight`, `centerLeft`, `centerRight`, `bottomLeft`, `bottomCenter`, `bottomRight`  
*callback*  
An event handler to be called when mouse pointer enter the circular area, arguments:  
`distance` {Number} : current distance between mouse pointer and matched element
`ele` {Node} : matched element
`event` {Event} : mousemove event  
  
  
####Trial.fn.leave(options, callback)
@params options {Object}  
@params callback {Function}  
@return {Trial instance}  

same as `Trial.fn.within`, but only call the event handler when mouse pointer leave the circular area  
*options*:  
  `distance` {Number} : determine the radius of the circular area  
  `cord` {String} : determine the center of the circular area, could be `center`, `topLeft`, `topCenter`, `topRight`, `centerLeft`, `centerRight`, `bottomLeft`, `bottomCenter`, `bottomRight`  
*callback*  
An event handler to be called when mouse pointer leave the circular area, arguments:  
`distance` {Number} : current distance between mouse pointer and matched element
`ele` {Node} : matched element
`event` {Event} : mousemove event 

####Trial.fn.off(eventName)
@params eventName {String}  
@return {Trial instance}  

Unbind an event handler for specific event, eventName could be `within`, `enter`, `leave`


## License
MIT
