window.addEventListener('load', function() {
    // 1.获取元素
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var footer = document.querySelector('.footer');
    var input = document.querySelector('.search input');
    // // 初始化底部菜单栏
    var lis = footer.querySelectorAll('li');
    lis[1].children[0].style.color = '#c00000';

    input.addEventListener('focus', function() {
        location.href = 'search.html?url=classification.html';
    })

    // 2.调用封装的ajax函数 -- 商品分类
    ajax({
        method: 'GET',
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
        data: null,
        success: function(result) {
            console.log(result)
            if (result.meta.status !== 200) return alert('获取导航栏数据失败');
            // 调用template函数
            var str = template('left', result);
            var str2 = template('right', result);
            // 渲染HTML结构
            left.innerHTML = str;
            right.innerHTML = str2;


            // 3.左侧选项卡
            var lis = left.querySelectorAll('li');
            var spans = left .querySelectorAll('span');
            for (var i = 0; i < lis.length; i++) {
                // 页面初始化
                var details = document.querySelectorAll('.detail');
                details[i].style.position = 'absolute';
                details[i].style.top = '-9999px';
                details[0].style.position = '';
                spans[0].className = 'current_l';
                
                lis[i].setAttribute('index', i);
                lis[i].addEventListener('touchstart', function() {
                    // 干掉所有人
                    for (let j = 0; j < lis.length; j++) {
                        spans[j].className = '';
                    }
                    // 留下我自己
                    var index = this.getAttribute('index');
                    spans[index].className = 'current_l';

                    // 4.右侧的显示内容模块
                    
                    // 干掉所有人
                    for (let j = 0; j < details.length; j++) {
                        details[j].style.position = 'absolute';
                        details[j].style.top = '-9999px';
                    }
                    // 留下我自己
                    details[index].style.position = '';
                })
            }
        }
    })


})