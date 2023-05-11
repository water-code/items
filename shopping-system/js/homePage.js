window.addEventListener('load', function() {
    // 1.获取元素
    var banner = document.querySelector('.banner');
    var scroll = document.querySelector('.scroll');
    var circle = document.querySelector('.circle');
    var nav = document.querySelector('.nav');
    var product= document.querySelector('.product');
    var footer = document.querySelector('.footer');
    var input = document.querySelector('.search input');

    // 初始化底部菜单栏
    var lis = footer.querySelectorAll('li');
    lis[0].children[0].style.color = '#c00000';

    // 2.获取banner盒子的宽度 不包含边框
    var w = banner.clientWidth; 

    input.addEventListener('focus', function() {
        location.href = 'search.html?url=homePage.html'
    })
    
    // 3.调用封装的ajax函数 -- 轮播图
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        data: null,
        success: function(result) { // result是需要渲染的数据
            // 注意要先渲染轮播图的页面结构再调用轮播函数
            if (result.meta.status !== 200) return alert('获取轮播图数据失败');
            // 调用template函数
            var str = template('Rotation', result)
            // 渲染HTML结构
            scroll.innerHTML = str;
            // 4.调用轮播函数
            Rotation(banner, scroll, circle, w);
            
        }
    })
    // 5.调用封装的ajax函数 -- 导航栏
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        data: null,
        success: function(result) {
            if (result.meta.status !== 200) return alert('获取导航栏数据失败');
            // 调用template函数
            var str = template('nav', result)
            // 渲染HTML结构
            nav.children[0].innerHTML = str;
        }
    })

    // 6.调用封装的ajax函数 -- 商品栏
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
        data: null,
        success: function(result) {
            if (result.meta.status !== 200) return alert('获取商品栏数据失败');
            // 调用template函数
            var str = template('market', result)
            // 渲染HTML结构
            product.innerHTML = str;
        }
    })
})