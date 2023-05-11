window.addEventListener('load', function() {
    // 1.获取元素
    var address = document.querySelector('.address');
    var get = document.querySelector('.get');
    var footer = document.querySelector('.footer');
    var productList = document.querySelector('.productList');
    var select_all = document.querySelector('.form1 input');
    var settlement_number = document.querySelector('.settlement_number');
    var dollar = document.querySelector('.dollar');

    // 初始化底部菜单栏
    var lis = footer.querySelectorAll('li');
    lis[2].children[0].style.color = '#c00000';

    // 2.收获详细信息触摸事件
    address.children[0].addEventListener('touchstart', function() {
        this.style.display = 'none';
        get.style.display = 'block';
    })


    // 3.调用封装的ajax函数 -- 购物车详细栏
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
        data: null,
        success: function(result) {
            console.log(result)
            if (result.meta.status !== 200) return alert('获取商品列表数据失败');
            // 调用template函数
            var str = template('productList', result);
            // 渲染HTML结构
            productList.innerHTML = str;

            // 4.双击跳转页面并且传递good_id这个参数
            var as = productList.querySelectorAll('a');
            for(var i = 0; i < as.length; i++) {
                as[i].addEventListener('touchend', function() {
                    var good_id = this.getAttribute('data-num');
                    location.href = 'productDetails.html?goods_id=' + good_id;
                })
            }

            // 5.全选按钮影响下面的小按钮
            var select_boxs = document.querySelectorAll('.form2 input');
            select_all.addEventListener('touchend', function() {
                for (let i = 0; i < select_boxs.length; i++) {
                    select_boxs[i].checked = !this.checked;
                    //this.checked它可以得到当前复选框的选中状态，如果是true就是选中，如果是false就是未选中
                }
            })

		    // 6.小按钮影响上面的全选按钮  下面都选上了全选按钮就选上了，
		    // 有一个全选按钮没有选上，那么这个全选按钮就不会选中
		    for (var i = 0; i < select_boxs.length; i++) {
			    select_boxs[i].onclick = function() {
				    // flag控制全选按钮是否被选中
				    var flag = true;
				    // 每次点击下面的复选框都要循环检查这4个小按钮是否全被选中
				    for (var i = 0; i < select_boxs.length; i++) {
					    if (!select_boxs[i].checked) {
					 	    flag = false;
					 	    break;
					 	    // 退出for循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
					    }
				    }
				    select_all.checked = flag;
			    }
                
		    }
            
            // 7.点击加号和减号按钮，里面的数字发生变化
            var adds = document.querySelectorAll('.add');
            var reduces = document.querySelectorAll('.reduce');
            var inputs = document.querySelectorAll('.add_num input');
            var prices = document.querySelectorAll('.calculate');

            for (var i = 0; i < select_boxs.length; i++) {
                adds[i].addEventListener('touchend', function() {
                    // 得到当前兄弟文本框的值
                    var n = this.previousElementSibling.value;
                    n++;
                    this.previousElementSibling.value = n;
                    this.previousElementSibling.previousElementSibling.style.color = '#000';

                    // 计算小计模块 辊距文本框的值 乘以 当前商品的价格 就是小计
                    // substr()截取字符串
                    var text = this.parentNode.parentNode.previousElementSibling.children[0].children[1].children[1].innerHTML.substr(1);
                    var price = text * n;
                    if (this.parentNode.parentNode.previousElementSibling.previousElementSibling.children[0].checked) {
                        this.parentNode.nextElementSibling.innerHTML = price;
                    } else {
                        this.parentNode.nextElementSibling.innerHTML = 0;
                    }
                    
                    getSum();
                }) 

                // 8.点击减号按钮，里面的数字发生变化，当减到1时里面的数字发生变化
                reduces[i].addEventListener('touchend', function() {
                    // 得到当前兄弟文本框的值
                    var n = this.nextElementSibling.value;
                    if (n == 1) {
                        this.style.color = '#ccc';
                        return false; // 如果程序里面碰到false 后面的代码就不再执行
                    } else {
                        n--;
                        this.nextElementSibling.value = n;
                        this.style.color = '#000';

                        // 计算小计模块 辊距文本框的值 乘以 当前商品的价格 就是小计
                        // substr()截取字符串
                        var text = this.parentNode.parentNode.previousElementSibling.children[0].children[1].children[1].innerHTML.substr(1);
                        var price = text * n;
                        if (this.parentNode.parentNode.previousElementSibling.previousElementSibling.children[0].checked) {
                            this.parentNode.nextElementSibling.innerHTML = price;
                        } else {
                            this.parentNode.nextElementSibling.innerHTML = 0;
                        }
                        
                        getSum();
                    }


                })
 

                // 8.用户修改文本框的值 计算 小计模块
                inputs[i].addEventListener('change',function() {
                    // 先得到文本框里面的值 乘以 当前商品的单价
                    var n = this.value;
                    // 当前商品的单价
                    var text = this.parentNode.parentNode.previousElementSibling.children[0].children[1].children[1].innerHTML.substr(1);
                    var price = n * text;
                    this.parentNode.nextElementSibling.innerHTML = price;
                    getSum();
                })

                // 计算总计和总和的函数
                getSum(); // 先调用一次函数
                function getSum() {
                    // 计算总件数
                    var count = 0;
                    // 计算总价钱
                    var money = 0;
                    for (let i = 0; i < select_boxs.length; i++) {
                        count += parseInt(inputs[i].value);
                        settlement_number.innerHTML = '('+ count +')'
                    }
                    for (let i = 0; i < select_boxs.length; i++) {
                        money += parseInt(prices[i].innerHTML);
                        dollar.innerHTML = '￥' + money;
                    }
                }
            }

           
            
            
            
        }


    })
    
    

})