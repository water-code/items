// 封装处理data函数的方法，将data对象转化成查询字符串的格式
function resolveData(data) {
    var arr = []
    for(var k in data) {
        var str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// 封装自己的ajax函数
function ajax(options) {
    var xhr = new XMLHttpRequest()

    // 把外界传递过来的参数，转换为查询字符串
    var query = resolveData(options.data)

    if(options.method.toUpperCase() === 'GET') {
        // 发起GET请求
        xhr.open(options.method, options.url + '?' + query)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起POST请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(query)    
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result) // 帮用户执行请求成功之后的操作
        }
    }
}