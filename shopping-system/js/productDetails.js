window.addEventListener('load', function() {
    // 1.获取元素
    var banner = document.querySelector('.banner');
    var scroll = document.querySelector('.scroll');
    var circle = document.querySelector('.circle');
    var introduce = document.querySelector('.introduce');
    var detail = document.querySelector('.detail');

    // 2.获取banner盒子的宽度 不包含边框
    var w = banner.clientWidth; 

    // 3.获取参数
    // 去掉?
    var params = location.search.substr(1);
    // 利用=把字符串分割成数组 split('=')
    var arr = params.split('=');
    var good_id = arr[1]
    console.log(good_id)  

    // 4.调用ajax函数 -- 商品详情
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
        data: {goods_id: good_id},
        success: function(result) { // result是需要渲染的数据
            console.log(result)
            // 注意要先渲染轮播图的页面结构再调用轮播函数
            if (result.meta.status !== 200) return alert('获取商品详情数据失败');
            // 调用template函数
            var str = template('Rotation', result);
            // 渲染HTML结构
            scroll.innerHTML = str;

            // 5.调用轮播函数
            Rotation(banner, scroll, circle, w);
            
            // 6.商品介绍栏渲染
            var str2 = template('introduce', result);
            introduce.innerHTML = str2;

            // 7.商品详细栏渲染
            var str3 = template('detail', result);
            detail.innerHTML = str3;

            // 8.点击收藏变色
            var star = document.querySelector('#star');
            var i = document.querySelector('i');
            var flag = true;
            star.addEventListener('touchstart', function() {
                if (flag) {
                    this.style.color = '#ffa200';
                    i.innerHTML = '取消收藏'
                    flag = false;
                } else {
                    this.style.color = '#ccc';
                    i.innerHTML = '收藏';
                    flag = true;
                }
            })

            // 9.放大预览图片
            var lis = scroll.querySelectorAll('li');
            var hidden = document.querySelector('.hidden');
            var play = document.querySelector('.display');
            var all = document.querySelector('.all');
            for (var j = 0; j < lis.length; j++) {
                lis[j].addEventListener('touchend', function() {
                    var src = this.querySelector('img').src;
                    hidden.innerHTML = '<img src="'+ src + '">';
                    all.style.display = 'none';
                    play.style.display = 'block';
                })
            }
            play.addEventListener('touchend', function() {
                all.style.display = 'block';
                play.style.display = 'none';
            })
        
        }

    })

})