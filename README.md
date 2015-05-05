#progress


之前在Github上分享了两个模块，一个是模块提供了面向对象开发的工具（[createClass](https://github.com/yunfour/createClass)），一个是观察者（发布/订阅）模式的js实现（[pubSub](https://github.com/yunfour/pubSub)）。这次分享的模块是在这两个模块基础上开发的一个小组件：模拟进度组件，其主要作用就是在前端开发中，模拟一些无状态且有延迟操作的进度，比如说：AJAX操作。

在进行AJAX操作时，由于AJAX请求是无状态的，也就是说，在请求进行时，我们无法得知其进行到何种程度，也就是我们根本无法实时的知道其具体的进度值，而我们所知道只有：合适开始请求、什么时候得到相应或者请求出错三个点，因此在进行AJAX操作是，很多UI设计师就在对应的UI界面中显示一个无限旋转的loading小图标，在得到响应后，将loading图标去掉或隐藏。

但是很多视觉和交互设计师在设计UI界面的时候，很想将整个过程的具体进度展示给用户，可以让用户知道这个过程进行到什么进度了，本人认为，这样的体验要优于loading图标的方式。其实对于无状态的情况，根本是无法实时知道其具体进度，这是一个瓶颈，不过可以通过模拟的形式去实现，只是模拟的结果并非是其真正的进度。

在当前组件中的模拟方式是这样的：在模拟进度在95%之前逐渐递加，但是并非匀速递加，到95%时仍未调用finish()方法完成进度，此时则停止递加，不管进度进行到什么时候，只要调用finish()方法完成进度时，进度之就会迅速递加到100%。


---

## API

该模块抛出了一个构造函数：Progress，该构造函数是通过createClass()函数（[https://github.com/yunfour/createClass](https://github.com/yunfour/createClass)）创建的，通过createClass()函数创建的构造函数的实例都会拥有：setAttr()、getAttr()、instanceOf()三个方法，这三个方法的作用，请参考[https://github.com/yunfour/createClass](https://github.com/yunfour/createClass)这个模块的说明。

另外，Progress继承了[pubSub](https://github.com/yunfour/pubSub)模块抛出的类，因此其还拥有pubSub模块中抛出的类的API，继承父类的API请到[pubSub](https://github.com/yunfour/pubSub)参考。

除了上述中提到的API，其自身还拥有以下几个API：

* start() 开始进度模拟
* pause() 暂停进度模拟，暂停时会保留当前进度，下此在开始时会从暂停时的进度开始
* stop() 停止进度，停止后进度值会重置为0
* restart() 重新开始进度模拟，进度将从开始模拟
* finish() 完成进度模拟，此时进度值会迅速递加到100%
* getProgress() 获取当前进度值


## 实例

具体实例都在example/目录下。请参考。