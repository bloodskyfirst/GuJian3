//广告页以及取消按钮
(function() {
	var ad = document.getElementsByClassName("ad")[0];
	var black = document.getElementsByClassName("av")[0].nextElementSibling.nextElementSibling.nextElementSibling
	//这里不把大的div 隐藏是因为让div压住位置
	setTimeout(function() {
		ad.children[0].style.display = "none"
		ad.children[1].style.display = "none"
		black.style.display = "none"
	}, 5000)

	ad.children[0].onclick = function() {
		ad.children[0].style.display = "none"
		ad.children[1].style.display = "none"
		black.style.display = "none"
	}
})();


//新闻显示
(function() {
	var div = document.getElementsByClassName("banner")[0].nextElementSibling.children[0]
	var ul = document.getElementsByClassName("banner")[0].nextElementSibling.getElementsByTagName("ul")
	div.onmouseover = function(e) {
		if (e.target.nodeName == "A") {
			for (let i in div.children) {
				//注意遍历,主要此时你通过一个选中来控制两个内容 所以除了选中的另外的一个键,还会遍历出其他的属性值以及原型对象...因此需通过nan来除去非数字类型,虽然i是字符串,但是nan会强行转换来判断 
				if (isNaN(i) == false) {
					if (div.children[i] == e.target) {
						// 此时找到了所显示a的下标.
						ul[i].style.display = "block";
						e.target.style.color = "#c6a35d"
					} else {
						ul[i].style.display = "none";
						div.children[i].style.color = "#b2b2b2";
					}
				}
			}
		}
	}
})();


//轮播图
(function() {
	//先找到轮播的大div
	var div = document.getElementsByClassName("banner")[0];
	//找到所有要轮播的图片
	var img = div.getElementsByTagName("img");
	//找到所有轮播的选项卡
	var ul = div.getElementsByTagName("ul")[0];
	var a = ul.getElementsByTagName("a");
	//封装轮播函数,加入定时器中.
	function banner() {
		count % img.length ? count++ : count = 1;
		if (count == 1) {
			img[img.length - 1].setAttribute("class", null)
			img[count - 1].setAttribute("class", "show")
			a[img.length - 1].setAttribute("class", null)
			a[count - 1].setAttribute("class", "show")
		} else {
			img[count - 2].setAttribute("class", null)
			img[count - 1].setAttribute("class", "show")
			a[count - 2].setAttribute("class", null)
			a[count - 1].setAttribute("class", "show")
		};
		// console.log(count)
	};
	//设置定时器执行轮播函数,每2秒下一张.
	timer = setInterval(banner, 2000)
	//设置图片的起始位置标签值count为1
	var count = 1;
	// 事件委托， 触发的元素为a. 修改的元素是a和img
	ul.onmouseover = function(e) {
		//先过滤选中非a标签元素
		if (e.target.nodeName == "A") {
			// 获取该点击元素的下标
			clearInterval(timer);
			for (let i in a) {
				if (a[i] == e.target) {
					img[count - 1].setAttribute("class", null)
					img[i].setAttribute("class", "show")
					a[count - 1].setAttribute("class", null)
					a[i].setAttribute("class", "show")
					//注意,类数组对象 for in遍历的时候,因为 遍历出来的是 对象中的 键 也就是下标值,此时下标值是作为元素看待
					count = Number(i) + 1
				}
			}
		}
	};
	ul.onmouseout = function(e) {
		if (e.target.nodeName == "A") {
			timer = setInterval(banner, 2000)
		}
	};
})();

//人物选项卡
(function() {
	//事件委托-ul绑定  & div>div
	var ul = document.getElementsByClassName("show1")[0].parentElement
	var div = document.getElementsByClassName("show1")[1].parentElement
	var li = ul.children
	ul.onmouseover = function(e) {
		//找到触发的元素
		if (e.target.nodeName == "DIV") {
			//遍历清除class 再添加
			for (let i in li) {
				//找到触发当前元素的下标
				if (li[i] == e.target.parentElement.parentElement) {
					document.getElementsByClassName("show1")[0].setAttribute("class", null);
					e.target.parentElement.parentElement.setAttribute("class", "show1")
					document.getElementsByClassName("show1")[1].setAttribute("class", null);
					div.children[i].setAttribute("class", "show1")
				}
			}

		}
	}
})();

//侧边栏
(function() {
	// 找到侧边栏的div
	var div = document.getElementsByClassName("av")[0].nextElementSibling.nextElementSibling
	//找到收起的按钮
	var hide = div.children[0].children[0].children[0]
	//以及展开的按钮
	var scroll = div.children[1].children[0].children[0]
	var a = div.querySelectorAll("p a")
	div.onclick = function(e) {
		if (e.target.nodeName == "A" && e.target.children[0].nodeName == "BR") {
			for (let i in a) {
				if (isNaN(i) == false) {
					if (a[i] == e.target) {
						a[i].parentElement.parentElement.style.display = "none";
					} else {
						a[i].parentElement.parentElement.style.display = "block";
					}
				}
			}
		}
	}
})();

//根据对应的选项栏显示对应的影音
(function() {
	//找到要触发的ul 事件委托
	var ul = document.getElementsByClassName("av")[0].getElementsByTagName("ul")[0]
	//找到触发的元素a
	var a = ul.getElementsByTagName("a")
	ul.onmouseover = function(e) {
		if (e.target.parentElement.nodeName == "LI") {
			for (let i in a) {
				if (a[i] == e.target) {
					//找到悬停的对应影音项下标,然后将所有的带有show2的删除class,然后再把对应的div的下标div添加class
					document.getElementsByClassName("show2")[0].setAttribute("class", null);
					ul.nextElementSibling.children[i].setAttribute("class", "show2");
				}
			}
		}
	}
})();

//影音以及图片  实现思路，先找到对应下标的div进行事件委托.分别绑定不同的显示
(function() {
	//找到要修改的影音栏
	var div = document.getElementsByClassName("av")[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
	//遮盖层
	var black= document.getElementsByClassName("av")[0].nextElementSibling.nextElementSibling.nextElementSibling
	//找到影音栏下的最后一个元素-div.以及找到div.children
	var av = document.getElementsByClassName("av")[0]
	child = av.children[3].children
	//给大div进行绑定事件
	av.onclick = function(e) {
		//触发的相同情况：触发的img和span prev都是父元素最后一个儿子
		if (e.target==e.target.parentElement.lastElementChild){
			if (e.target.nodeName == "IMG") {
				// 此时触发的是视频,已经默认在第一个里面寻找.继续判断此时的img在对应父元素的下标
				var img = child[0].querySelectorAll("p+img")
				for (let i in img) {
					if (img[i] == e.target) {
						div.innerHTML =	`<video width="960" height="540" controls="" autoplay="">
											<source src="gjqt3_0${Number(i)+1}.mp4" type="video/mp4"></source>
										</video>` +div.innerHTML;
						div.style.display = "block"
						black.style.display = "block"
					}
				}
			} else { //此时要先遍历找到显示的div的下标在大div的下标，根据对应的下标来显示对应的大图
				for (let x in child) {
					if (child[x] == e.target.parentElement.parentElement.parentElement) {
						switch (Number(x)) {
							case 1:
								for (let a in child[1].children) {
									if (child[1].children[a] == e.target.parentElement.parentElement) {
										div.innerHTML = `<img src='y_${Number(a)+1}_e.jpg' >` + div.innerHTML;
										div.style.display = "block"
										black.style.display = "none"
									}
								}break;
							case 2:
								for (let b in child[2].children) {
									if (child[2].children[b]  == e.target.parentElement.parentElement) {
										div.innerHTML = `<img src='j_${Number(b)+1}_e.jpg' >` + div.innerHTML;
										div.style.display = "block"
									}
								};
								break;
							case 3:
								for (let c in child[3].children) {
									if (child[3].children[c]  == e.target.parentElement.parentElement) {
										div.innerHTML = `<img src='b_${Number(c)+1}_e.jpg' >` + div.innerHTML;
										div.style.display = "block"
									}
								} break;
						}
						black.style.display = "block"
					}
				}
			}
			div.lastElementChild.onclick=function(){
				div.style.display = "none"
				black.style.display = "none"
				//因为每次都要还原样式，直接不需要的时候直接去掉节点
				div.removeChild(this.previousElementSibling)
			}
		}
	}
})();

//缺少  3.滚动栏
// (function(){
// 	var x=0;运动距离
// 	// document分别获取文本框的宽度以及滚动栏的总宽度
// 	var width1=
// 	var width2=
// 	// 当运动的距离达到了width2-width1 也就是到达底部的时候,
// 	if(x==width2-width1){
// 		
// 	}else{
// 		
// 	}
// })();
