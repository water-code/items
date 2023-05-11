window.addEventListener('load', function() {
    // 1.获取元素
    var one = document.querySelector('.one');
    var footer = document.querySelector('.footer');
    var signOut = document.querySelector('.signOut')
    var hid = document.querySelector('.hid')
    var yes = document.querySelector('.yes');
    var no = document.querySelector('.no');

    // 初始化底部菜单栏
    var lis = footer.querySelectorAll('li');
    lis[3].children[0].style.color = '#c00000';

    // 3.点击一键登录后页面显示
    one.addEventListener('touchend', function() {
        this.parentNode.style.display = 'none';
        this.parentNode.nextElementSibling.style.display = 'block';
    })

    // 4.点击退出登录现实退出确认框 
    signOut.addEventListener('touchend', function() {
        hid.style.display = 'block';
        hid.nextElementSibling.style.display = 'block';
    })

    // 5.点击确认或者取消的事件程序
    yes.addEventListener('touchend', function() {
        hid.style.display = 'none';
        hid.nextElementSibling.style.display = 'none';
        one.parentNode.nextElementSibling.style.display = 'none';
        one.parentNode.style.display = 'block';
        this.style.fontWeight = '400';
    })

    no.addEventListener('touchend', function() {
        hid.style.display = 'none';
        hid.nextElementSibling.style.display = 'none';
        this.style.fontWeight = '400';
    })

    // 6.触摸时文字变粗
    yes.addEventListener('touchstart', function() {
        this.style.fontWeight = '700';
    })
    no.addEventListener('touchstart', function() {
        this.style.fontWeight = '700';
    })
}) 