<<<<<<< HEAD
(function () {
=======
;(function () {
>>>>>>> origin/2.0
    function Array_h(length) {
        this.array = length === undefined ? [] : new Array(length);
    }

    Array_h.prototype = {
        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 返回数组长度
         *
         * @return {Number} length [数组长度]
         *
         * \~english
>>>>>>> origin/2.0
         * return length of array
         *
         * @return {Number} length [length of array]
         */
        length: function () {
            return this.array.length;
        },

        at: function (index) {
            return this.array[index];
        },

        set: function (index, obj) {
            this.array[index] = obj;
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 向数组的末尾添加一个或多个元素，并返回新的长度。
         *
         * @param  {*} obj [description]
         * @return {Number} length [新数组的长度]
         *
         * \~english
>>>>>>> origin/2.0
         * add object to the end of array, and return length of array
         *
         * @param  {*} obj [description]
         * @return {Number} length [length of array]
         */
        push: function (obj) {
            return this.array.push(obj);
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 返回数组中选定的元素
         *
         * @param  {Number} start [开始索引值]
         * @param  {Number} end [结束索引值]
         * @return {Array} newArray  [新的数组]
         *
         * \~english
>>>>>>> origin/2.0
         * return selected range of object in array
         *
         * @param  {Number} start [start index]
         * @param  {Number} end [end index]
         * @return {Array} newArray  [new array]
         */
        slice: function (start, end) {
            return this.array = this.array.slice(start, end);
        },

        concat: function (array) {
            this.array = this.array.concat(array);
        },

        remove: function (index, count) {
            count = count === undefined ? 1 : count;
            this.array.splice(index, count);
        },

        join: function (separator) {
            return this.array.join(separator);
        },

        clear: function () {
            this.array.length = 0;
        }
    };

    /**
<<<<<<< HEAD
=======
     * \~chinese
     * 先进先出队列 (First Input First Output)
     *
     * 一种先进先出的数据缓存器
     *
     * \~english
>>>>>>> origin/2.0
     * First Input First Output
     *
     * FIFO buffer
     */
    var Queue = function () {
        this._array_h = new Array_h();
    };

    Queue.prototype = {
        _index: 0,

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 排队
         *
         * @param  {Object} obj [description]
         * @return {[type]}     [description]
         *
         * \~english
>>>>>>> origin/2.0
         * queue
         *
         * @param  {Object} obj [description]
         * @return {[type]}     [description]
         */
        push: function (obj) {
            this._array_h.push(obj);
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 出队
         *
         * @return {Object} [description]
         *
         * \~english
>>>>>>> origin/2.0
         * dequeue
         *
         * @return {Object} [description]
         */
        pop: function () {
            var ret = null;
            if (this._array_h.length()) {
                ret = this._array_h.at(this._index);
                if (++this._index * 2 >= this._array_h.length()) {
                    this._array_h.slice(this._index);
                    this._index = 0;
                }
            }
            return ret;
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 返回队列中头部(即最新添加的)的动态对象
         *
         * @return {Object} [description]
         *
         * \~english
>>>>>>> origin/2.0
         * return the latest added object of the array (last object in array)
         *
         * @return {Object} [description]
         */
        head: function () {
            var ret = null, len = this._array_h.length();
            if (len) {
                ret = this._array_h.at(len - 1);
            }
            return ret;
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 返回队列中尾部(即最早添加的)的动态对象
         *
         * @return {Object} [description]
         *
         * \~english
>>>>>>> origin/2.0
         * return the oldest added object of the array
         *
         * @return {Object} [description]
         */
        tail: function () {
            var ret = null, len = this._array_h.length();
            if (len) {
                ret = this._array_h.at(this._index);
            }
            return ret;
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 返回数据队列长度
         *
         * @return {Number} [description]
         *
         * \~english
>>>>>>> origin/2.0
         * return the length of the queue
         *
         * @return {Number} [description]
         */
        length: function () {
            return this._array_h.length() - this._index;
        },

        /**
<<<<<<< HEAD
=======
         * \~chinese
         * 队列是否为空
         *
         * @return {Boolean} [description]
         *
         * \~english
>>>>>>> origin/2.0
         * if empty queue
         *
         * @return {Boolean} [description]
         */
        empty: function () {
            return (this._array_h.length() === 0);
        },

        clear: function () {
            this._array_h.clear();
        }
    };
    exports.Queue = Queue;
}());
