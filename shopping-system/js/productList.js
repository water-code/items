window.addEventListener('load', function() {
    // 1.获取元素
    var productList = document.querySelector('.productList');

    // 2.调用封装的ajax函数 -- 商品列表项
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

            // 3.跳转页面并且传递good_id这个参数
            var as = productList.querySelectorAll('a');
            for(var i = 0; i < as.length; i++) {
                as[i].addEventListener('touchend', function() {
                    var good_id = this.getAttribute('data-num');
                    location.href = 'productDetails.html?goods_id=' + good_id;
                })
            }
        }
    })


})