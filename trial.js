;(function (self) {

    /**
     * create new M instance if no matched selector found in Trial.queue
     * @param selector
     * @returns {M}
     * @constructor
     */
    var Trial = function (selector) {
        var m = Trial.checkDup(selector);
        if(m){
            return m;
        }else{
            var nm = new M(selector);
            Trial.queue.push(nm);
            return nm;

        }
    };



    /**
     * document mousemove event handler would invoke each M instances in this array
     * @type {Array}
     */
    Trial.queue = [];



    /**
     * check if two node lists are equal
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    Trial.checkSame = function (arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }

        return true;
    };



    /**
     * get default options for Trial()
     * @returns {{distance: number, cord: string}}
     */
    Trial.getDefaultOpts = function (){
        return {
            distance: 50,
            cord: 'center'
        }
    };



    /**
     * get an element's coordinate based on cord option
     * @param ele
     * @param cord
     * @returns {{top: *, left: *}}
     */
    Trial.getEleCord = function (ele, cord){
        var rect = Trial.getEleRect(ele);
        switch(cord.toLowerCase()){
            case 'center':
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left + rect.width / 2
                };
            case 'topleft':
                return {
                    top: rect.top,
                    left: rect.left
                };
            case 'topcenter':
                return {
                    top: rect.top,
                    left: rect.left + rect.width / 2
                };
            case 'topright':
                return {
                    top: rect.top,
                    left: rect.left + rect.width
                };
            case 'bottomleft':
                return {
                    top: rect.top + rect.height,
                    left: rect.left
                };
            case 'bottomcenter':
                return {
                    top: rect.top + rect.height,
                    left: rect.left + rect.width / 2
                };
            case 'bottomright':
                return {
                    top: rect.top + rect.height,
                    left: rect.left + rect.width
                };
            case 'centerleft':
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left
                };
            case 'centerright':
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left + rect.width
                };
            default:
                return {
                    top: rect.top + rect.height / 2,
                    left: rect.left + rect.width / 2
                }
        }
    };



    /**
     * get element position related to viewport
     * @param ele
     * @returns {{top: (Number|number), left: (Number|number), width: (Number|number), height: (Number|number)}}
     */
    Trial.getEleRect = function (ele){
        var rect = ele.getBoundingClientRect();
        return {
            top: rect.top || 0,
            left: rect.left || 0,
            width: rect.width || 0,
            height: rect.height || 0
        }
    };



    /**
     * get dom elements by selector
     * @param selector
     * @returns {*}
     */
    Trial.getEles = function (selector) {
        if(typeof selector == 'string'){
            return document.querySelectorAll(selector);
        }else if(typeof selector == 'object'){
            if(selector.constructor == Array
                || selector.constructor == NodeList){
                var eles = [];
                for(var i = 0; i < selector.length; i++){
                    if(selector[i].nodeType
                        && (selector[i].nodeType == 1
                        || selector[i].nodeType == 9
                        || selector[i].nodeType == 11)){
                        eles.push(selector[i]);
                    }
                }
                return eles;
            }else{
                if(selector.nodeType){
                    return selector.nodeType == 1
                    || selector.nodeType == 9
                    || selector.nodeType == 11
                        ? [selector] : [];
                } else if(window.$){
                    if(selector instanceof window.$){
                        return selector.get();
                    }else{
                        return [];
                    }
                } else{
                    return [];
                }
            }
        }
    };



    /**
     * get document pointer position related to viewport
     * @param event
     * @returns {{top: (Number|number), left: (Number|number)}}
     */
    Trial.getPointerPos = function (event) {
        return {
            top: event.clientY,
            left: event.clientX
        }
    };



    /**
     * check if any M instances match the selector
     * @param selector
     * @returns {*}
     */
    Trial.checkDup = function (selector) {
        var newEles = Trial.getEles(selector);
        for(var i = 0; i < Trial.queue.length; i ++){
            var instance = Trial.queue[i];
            if(Trial.checkSame(instance, newEles)){
                return instance;
            }
        }
    };



    /**
     * call M listeners in Trial.queue
     * @param pointerPos
     * @param m
     * @param event
     */
    Trial.invoke = function (pointerPos, m, event) {
        var keys = Object.keys(m.listeners || {});
        for(var i = 0; i < keys.length; i++){
            m.listeners[keys[i]].call(m, pointerPos, event);
        }
    };



    /**
     * simple document mousemove throttle implementation
     * @param callback
     * @param limit
     * @returns {Function}
     */
    Trial.throttle = function (callback, limit) {
        var wait = false;
        return function (event) {
            if (!wait) {
                callback.call(this, event);
                wait = true;
                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    };



    var M = function(selector){
        var dom = Trial.getEles(selector);
        this.length = dom.length;
        this.listeners = {};
        for(var i = 0; i < dom.length; i++){
            this[i] = dom[i];
        }
    };



    M.prototype.off = function (name) {
        delete this.listeners[name];
        return this;
    };



    M.prototype.within = function (options, callback) {
        var opts, cb;
        if(typeof options == 'function'){
            cb = options;
            opts = Trial.getDefaultOpts();
        }else{
            opts = options;
            cb = callback;
        }

        this.listeners.within = function (pointerPos, event) {
            for(var i = 0; i < this.length; i++){
                var cord = Trial.getEleCord(this[i], opts.cord);
                var distance = Math.sqrt(
                    Math.pow(Math.abs(pointerPos.top - cord.top), 2)
                    + Math.pow(Math.abs(pointerPos.left - cord.left), 2)
                );
                if(distance < opts.distance){
                    cb.call(this, distance, this[i], event);
                }
            }
        };

        return this;
    };



    M.prototype.leave = function (options, callback) {
        var opts, cb;
        var outside = {};
        for(var i = 0; i < this.length; i ++){
            outside[i] = false;
        }
        if(typeof options == 'function'){
            cb = options;
            opts = Trial.getDefaultOpts();
        }else{
            opts = options;
            cb = callback;
        }

        this.listeners.leave = function (pointerPos, event) {
            for(var i = 0; i < this.length; i++){
                var cord = Trial.getEleCord(this[i], opts.cord);
                var distance = Math.sqrt(
                    Math.pow(Math.abs(pointerPos.top - cord.top), 2)
                    + Math.pow(Math.abs(pointerPos.left - cord.left), 2)
                );
                if(distance > opts.distance){
                    if(!outside[i]){
                        outside[i] = true;
                        cb.call(this, distance, this[i], event);
                    }
                }else{
                    outside[i] = false;
                }
            }
        };

        return this;
    };



    M.prototype.enter = function (options, callback) {
        var opts, cb;
        var inside = {};
        for(var i = 0; i < this.length; i ++){
            inside[i] = false;
        }
        if(typeof options == 'function'){
            cb = options;
            opts = Trial.getDefaultOpts();
        }else{
            opts = options;
            cb = callback;
        }

        this.listeners.enter = function (pointerPos, event) {
            for(var i = 0; i < this.length; i++){
                var cord = Trial.getEleCord(this[i], opts.cord);
                var distance = Math.sqrt(
                    Math.pow(Math.abs(pointerPos.top - cord.top), 2)
                    + Math.pow(Math.abs(pointerPos.left - cord.left), 2)
                );
                if(distance < opts.distance){
                    if(!inside[i]) {
                        inside[i] = true;
                        cb.call(this, distance, this[i], event);
                    }
                }else{
                    inside[i] = false;
                }
            }
        };

        return this;
    };



    function init(root){

        root.Trial = Trial;

        if(root.document){
            root.document.addEventListener('mousemove', root.Trial.throttle(function (event) {
                var pointerPos = root.Trial.getPointerPos(event);
                for(var i = 0; i < root.Trial.queue.length; i++){
                    root.Trial.invoke(pointerPos, root.Trial.queue[i], event);
                }
            }, 50));
        }

        if(root.$ || root.jQuery || root.Zepto){
            root.$.fn.extend({
                within: function(options, callback){
                    var trial = root.Trial(this.get());
                    trial.within(options, callback);
                    return this;
                },
                enter: function(options, callback){
                    var trial = root.Trial(this.get());
                    trial.enter(options, callback);
                    return this;
                },
                leave: function(options, callback){
                    var trial = root.Trial(this.get());
                    trial.leave(options, callback);
                    return this;
                }
            })
        }

    }

    

    if(typeof module === 'object' && module.exports){
        module.exports = init(self);
    }else{
        init(self);
    }


})(this);