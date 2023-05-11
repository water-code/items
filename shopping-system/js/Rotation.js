function Rotation(banner, scroll, circle, w) {
    //  轮播图开始

    // 1.动态生成小圆点
    for (var i = 0; i < scroll.children.length; i++) {
        // (1)创建一个小li
        var li = document.createElement('li');
        // 记录小圆圈的索引号 通过自定义属性来做
        li.setAttribute(index, i);
        // (2)把小li添加到ul里面去
        circle.appendChild(li);
        circle.children[0].classList.add('current');
    }

    // 2.克隆图片
    // 克隆第一张图片 放到ul的最后面
    var first_img = scroll.children[0].cloneNode(true);
    scroll.appendChild(first_img);

    // 克隆最后一张图片 放到ul的最前面
    var last_img = scroll.children[scroll.children.length - 1].cloneNode(true);
    scroll.insertBefore(last_img, scroll.children[0]);

    // 3.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = - w * index; // 这是盒子现在的位置
        scroll.style.transition = 'all .3s';
        scroll.style.transform = 'translateX('+ translatex +'px)';
    }, 2000);

    // 4.等着我们过渡完成之后，再去判断监听过渡完成的事件 transitionend
    scroll.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= circle.children.length) {
            index = 0;
            // 去掉过度效果 这样让我们的scroll快速跳转到目标位置
            scroll.style.transition = 'none';
            // 利用最新的索引号乘以宽度 来去滚动图片
            var translatex = - w * index; // 这是盒子现在的位置
            scroll.style.transform = 'translateX('+ translatex +'px)';            
        } else if (index < 0) {
            index = circle.children.length - 1;
            // 去掉过度效果 这样让我们的scroll快速跳转到目标位置
            scroll.style.transition = 'none';
            // 利用最新的索引号乘以宽度 来去滚动图片
            var translatex = - w * index; // 这是盒子现在的位置
            scroll.style.transform = 'translateX('+ translatex +'px)';        
        }

        // 5.小圆点跟随变化
        document.querySelector('.current').classList.remove('current');
        circle.children[index].classList.add('current');
    })

    // 6.手指滑动轮播图
    // 触摸元素 touchstart：获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    banner.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer); // 手指触摸的时候就停止计时器
    })
     // 移动元素 touchmove：计算手指的滑动距离，并且移动盒子
    banner.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：盒子原来的位置 + 手指移动的距离
        var x = -index * w + moveX;
        // 手指拖动的时候不需要动画效果所以需要取消过渡效果
        scroll.style.transition = 'none';
        scroll.style.transform = 'translateX('+ x +'px)'; // 作用是让盒子动起来就要加transform
        flag = true; // 如果用户手指移动过了才做判断，否则不做判断效果
        e.preventDefault(); //阻止滚动屏幕的默认行为
    })
    banner.addEventListener('touchend', function(e) {
        // (1) 如果移动距离大于50px，就播放上一张或者下一张
        if (flag) {
            if (Math.abs(moveX) > 100) {
                // 如果右滑就是播放上一张 moveX > 0
                if (moveX > 0) {
                    
                    index--;
                // 如果左滑就是播放下一张 moveX < 0   
                } else {
                    index++;
                }
                var x = -index * w;
                scroll.style.transition = 'all .3s';
                scroll.style.transform = 'translateX(' + x +'px)';
            } else {
                // 如果移动距离小于50px，就实现回弹效果
                var x = -index * w;
                scroll.style.transition = 'all .3s';
                scroll.style.transform = 'translateX(' + x +'px)';
            }
        }
        clearInterval(timer); // 清除之前的定时器，保证当前页面只有一个定时器在运行
        // 手指移开，重新开启定时器
        timer = setInterval(function() { // 注意：前面要加个变量timer，否则不认为是timer这个定时器
            index++;
            var translatex = - w * index; // 这是盒子现在的位置
            scroll.style.transition = 'all .3s';
            scroll.style.transform = 'translateX('+ translatex +'px)'; //记得加px
        }, 2000);        
    })
    //  轮播图结束
}