(function () {
    'use strict';

    //函数声明,会在一加载时初始化
    function DoTest() {

    }

    //函数表达式
    var Animal = function (name,age) {
        this.name = name;
        this.age = age;
        this.say = function () {
            console.log(this.name+'  '+this.age)
        };
    };

    Animal.prototype.eat = function () {
        console.log(this.name + "吃东西");
    };

    var cat = new Animal('小猫',3);
    cat.say();
    cat.eat();

    //寄生组合继承
    //call() apply() 调用一个对象的一个方法，
    //用另一个对象替换
    Animal.prototype.eat.call(cat);
    var params = {
        name : '大猫',
        age: '4'
    };
    cat.eat.call(params);

    //寄生组合继承
    var Cat = function (name,age) {
      // Animal.apply(this,arguments);
      Animal.call(this,name,age);
    };
    // Cat.prototype = new Animal();
    //区分上面，克隆方式实现
    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.eat = function () {
        var p = {
            name:"父类",
            age:10
        }
        Animal.prototype.eat.apply(p);
        console.log('这是子类的名字:'+this.name+"，年龄："+this.age);
    };
    var cat1 = new Cat('蓝猫',1);
    cat1.eat();
})();