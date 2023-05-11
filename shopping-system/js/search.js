window.addEventListener('load', function() {
    // 1.获取用户输入的搜索关键词
    var input = document.querySelector('.search input');
    var container = document.querySelector('.container');
    var empty = document.querySelector('.false');
    var back = document.querySelector('.return');
    var cacheObj = {};
    var history =  document.querySelector('.history_bottom');
    var move = this.document.querySelector('.remove')

    // 点击返回按钮，返回前一个页面
    back.addEventListener('touchend', function() {
        // 获取参数
        // 去掉?
        var params = location.search.substr(1);
        // 利用=把字符串分割成数组 split('=')
        var arr = params.split('=');
        var url = arr[1]
        console.log(url)
        back.href = url;
    })

    // 点击叉号清空文本框里面的内容
    empty.addEventListener('touchend', function() {
        input.value = '';
        container.style.display = 'none';
    })
    // 键盘弹起处理事件
    input.addEventListener('keyup', function() {
        clearTimeout(timer)
        // 获取用户输入的内容
        var keywords = input.value.trim();
        // 判断用户输入的内容是否为空
        if (keywords.length <= 0) {
            return container.style.display = 'none';
        }
        container.style.display = 'block';
        // 先判断缓存中是否有数据
        if (cacheObj[keywords]) {
            return renderSuggerstList(cacheObj[keywords])
          }        
        debounceSearch(keywords);
    })

    // 定义输入框防抖函数
    var timer = null;
    function debounceSearch(keywords) { // 2.定义防抖函数
        timer = setTimeout(function() {
            // 发起ajax请求- 搜索列表
            ajax({
                method: 'GET',
                url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
                data: {query: keywords},
                success: function(result) {
                    console.log(result)
                    // 调用template函数
                    var str = template('search-list', result);
                    // 渲染HTML结构
                    container.innerHTML = str;
                }
            })
        }, 500)
    }

    // 定义缓存函数
    function renderSuggerstList(res) {
        if (res.message.length <= 0 || input.value.trim() == '') {
            return container.style.display = 'none';
        }
        // 调用template函数
        var str = template('search-list', result);
        // 渲染HTML结构
        container.innerHTML = str;
        container.style.display = 'block';

        // 获取到用户输入的内容 当作键
        var k = input.value.trim()
        // 需要将数据作为值，进行缓存
        cacheObj[k] = res;
    }

    // 搜索历史开始
    var arr = [];
    input.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) {
            arr.push('<span>'+ input.value +'</span>');
            history.innerHTML = arr.join('');
        }
    })

    move.addEventListener('touchend', function() {
        history.innerHTML = '';
    })

})