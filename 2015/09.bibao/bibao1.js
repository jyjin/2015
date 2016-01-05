//闭包访问修饰符
// var BB = (function(){

// 	//private
// 	var privateProperty = "我是闭包私有属性";
// 	//private
// 	var privateMethod = function(){
// 		console.log("我是闭包私有方法");
// 	}
// 	//constructor
// 	function BibaoClass(){
// 		//公开私有属性方式一
// 		this.publicProperty1 = "我是闭包公开属性";
// 		//公开私有方法方式一
// 		this.publicMethod1 = function(){
// 			console.log("我是闭包公开方法");
// 		}
// 	}
// 	//获取私有属性
// 	BibaoClass.prototype.getPrivateProperty= function(){
// 		console.log(privateProperty);
// 		return privateProperty;
// 	}
// 	BibaoClass.prototype.getPrivateMethod = function(){
// 		return privateMethod();
// 	}
// 	//公开私有方法方式二
// 	BibaoClass.prototype.publicMethod = function(){
// 		console.log("我是闭包公开方法");
// 	}
// 	BibaoClass.prototype.publicProperty="我是闭包公开属性";
	
// 	return BibaoClass;

// })()


// var test1 = function(){
// 	var b = new BB();

// 	console.log(b.privateProperty);//undefined
// 	b.getPrivateProperty();

// 	// b.privateMethod();//.. is not a function
// 	b.getPrivateMethod();

// 	console.log(b.publicProperty);
// 	b.publicMethod();
// }

/*********************************************************************************************************/
//闭包访问修饰符
var options = {};
var BB = (function(){

	//private
	var privateProperty = "我是闭包私有属性";
	//private
	var privateMethod = function(){
		console.log("我是闭包私有方法");
	}

	//constructor
	function BibaoClass(){
		privateProperty = options.privateProperty || privateProperty;
		//公开私有属性方式一
		this.publicProperty1 = "我是闭包公开属性";
		//公开私有方法方式一
		this.publicMethod1 = function(){
			console.log("我是闭包公开方法");
		}
	}
	//获取私有属性
	BibaoClass.prototype.getPrivateProperty= function(){
		console.log(privateProperty);
		return privateProperty;
	}
	BibaoClass.prototype.getPrivateMethod = function(){
		return privateMethod();
	}
	//公开私有方法方式二
	BibaoClass.prototype.publicMethod = function(){
		console.log("我是闭包公开方法");
	}
	BibaoClass.prototype.publicProperty="我是闭包公开属性";
	
	return BibaoClass;

})(jQuery,options)


var test1 = function(){
	var b = new BB();

	console.log(b.privateProperty);//undefined
	b.getPrivateProperty();

	// b.privateMethod();//.. is not a function
	b.getPrivateMethod();

	console.log(b.publicProperty);
	b.publicMethod();
}


$(function(){
	test1();
})