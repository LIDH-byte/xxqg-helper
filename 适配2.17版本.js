"ui";

importClass(android.database.sqlite.SQLiteDatabase);

var tips = ["每天进步一点点，今天也要元气满满。","明日复明日，明日何其多。","长风破浪会有时，直挂云帆济沧海。","博观而约取，厚积而薄发。","与子同袍，岂曰无衣","天行健，君子以自强不息；","地势坤，君子以厚德载物。","靡不有初，鲜克有终。"] 

var customize_flag = false;//自定义运行标志
var aCount = 6;//文章默认学习篇数
var vCount = 6;//小视频默认学习个数
var cCount = 2;//分享次数
var cCount = 1; //评论次数
var asub = 2; //订阅数

var aTime =10;//每篇文章学习10秒
var pTime = 360; //文章时长
var vTime = 7;//每个小视频学习7秒
var rTime = 360;//视频时长

var commentText = ["支持党，支持国家！", "为实现中华民族伟大复兴而不懈奋斗！", "紧跟党走，毫不动摇！",
    "不忘初心，牢记使命", "努力奋斗，报效祖国！"];//评论内容，可自行修改，大于5个字便计分

var aCatlog = "推荐"//文章学习类别，可自定义修改为“要闻”、“新思想”等

var lCount = 1;//挑战答题轮数
var qCount = randomNum(5, 7);//挑战答题每轮答题数

var oldaquestion;//争上游和对战答题循环，定义旧题目对比新题目用20201022
var zCount=2;//争上游答题轮数

var myScores = []; //分数数组及初始化

myScores['登录'] = 0;
myScores['阅读文章'] = 0;
myScores['文章时长'] = 0;
myScores['视听学习'] = 0;
myScores['视听学习时长'] = 0;
myScores['每日答题'] = 0;
myScores['每周答题'] = 0;
myScores['专项答题'] = 0;
myScores['挑战答题'] = 0;
myScores['争上游答题'] = 0;
myScores['双人对战'] = 0;
myScores['订阅'] = 0;
myScores['分享'] = 0;
myScores['发表观点'] = 0;
myScores['本地频道'] = 0;



/**
 * @description: 延时函数
 * @param: seconds-延迟秒数
 * @return: null
 */

function delay(seconds) {
    sleep(1000 * seconds);//sleep函数参数单位为毫秒所以乘1000
    }

function delays(seconds) {
   sleep(2000 * seconds*(Math.random()+1));
   }


/**
 * @description: 生成从minNum到maxNum的随机数
 * @param: minNum-较小的数
 * @param: maxNum-较大的数
 * @return: null
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

/**
 * @description: 文章学习计时(弹窗)函数
 * @param: n-文章标号 seconds-学习秒数
 * @return: null
 */
function article_timing(n, seconds) {
    h = device.height;//屏幕高
    w = device.width;//屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    for (var i = 0; i < seconds; i++) {
        while (!textContains("欢迎发表你的观点").exists())//如果离开了文章界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "文章界面，请重新返回文章页面...");
            delay(2);
        }
        if (i % 5 == 0)//每5秒打印一次学习情况
        {
            console.info("第" + (n + 1) + "篇文章已经学习" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        delay(1);
        if (i % 10 == 0)//每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
        {
            var num = random(0, tips.length - 1)//随机数
            toast(tips[num]);
            if (i <= seconds / 2) {
                swipe(x, h1, x, h2, 500);//向下滑动
            }
            else {
                swipe(x, h2, x, h1, 500);//向上滑动
            }
        }
    }
}

/**
 * @description: 视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_bailing(n, seconds) {
    for (var i = 0; i < seconds; i++) {
        while (!textContains("分享").exists())//如果离开了百灵小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个百灵小视频界面，请重新返回视频");
            delay(2);
        }
        delay(1);
        console.info("第" + (n + 1) + "个小视频已经观看" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
}

/**
 * @description: 新闻联播小视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_news(n, seconds) {
    for (var i = 0; i < seconds; i++) {
        delay(1);
        while (!textContains("欢迎发表你的观点").exists())//如果离开了联播小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个新闻小视频界面，请重新返回视频");
            delay(2);
        }
        delay(1);
        console.info("第" + (n + 1) + "个小视频已经观看" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
}

/**
 * @description: 广播学习计时(弹窗)函数
 * @param: r_time-已经收听的时间 seconds-学习秒数
 * @return: null
 */
function radio_timing(r_time, seconds) {
    for (var i = 0; i < seconds; i++) {
        delay(1);
        if (i % 5 == 0)//每5秒打印一次信息
        {
            console.info("广播已经收听" + (i + 1 + r_time) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        if (i % 15 == 0)//每15秒弹一次窗防止息屏
        {
            var num = random(0, tips.length - 1)//随机数
            toast(tips[num]);
        }
    }
}

/**
 * @description: 日期转字符串函数
 * @param: y,m,d 日期数字 2019 1 1
 * @return: s 日期字符串 "2019-xx-xx"
 */
function dateToString(y, m, d) {
    var year = y.toString();
    if ((m + 1) < 10) {
        var month = "0" + (m + 1).toString();
    }
    else {
        var month = (m + 1).toString();
    }
    if (d < 10) {
        var day = "0" + d.toString();
    }
    else {
        var day = d.toString();
    }
    var s = year + "-" + month + "-" + day;//年-月-日
    return s;
}

/**
 * @description: 获取当天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getTodayDateString() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();

    var s = dateToString(y, m, d);//年-月-日
    return s
}

/**
 * @description: 获取昨天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getYestardayDateString() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var s = dateToString(y, m, d);//年-月-日
    return s
}

/**
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudy() {
    while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
    id("home_bottom_tab_button_work").findOne().click();//点击主页正下方的"学习"按钮
    delay(2);
    var listView = className("ListView");//获取文章ListView控件用于翻页
    click(aCatlog);
    delay(2);
    var currentNewsTitle = "";
    var fail = 0;//点击失败次数
    var date_string = getYestardayDateString();//获取昨天日期
    for (var i = 0, t = 0; i < aCount;) {
         var art_obj = text(date_string).findOnce(t);
        if ((art_obj != null) && (art_obj.parent().childCount() == 4)) {
            t++; //t为实际查找的文章控件在当前布局中的标号,和i不同,勿改动!
            if ((art_obj.parent().child(3).text() == "播报") && (art_obj.parent().child(0).text() != currentNewsTitle)) //如果播报存在就进入文章正文
            {
                currentNewsTitle = art_obj.parent().child(0).text();
                log(currentNewsTitle);
                art_obj.parent().click();
                delay(1);
                console.log("正在学习第" + (i + 1) + "篇文章...");
                fail = 0; //失败次数清0
               if (i < sCount)
               {
                 CollectAndShare(i);
               }
               if (i < cCount)
               {
                 Comment(i);
               }
                var aaTime = randomNum(aTime, 15);
                article_timing(i, aaTime);
                pTime = pTime - aaTime;
                back(); //返回主界面
                while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
                delay(1);
                i++;

            } else { //判断非目标文章
                if (t > 5) {
                    listView.scrollForward(); //向下滑动(翻页
                    log("……翻页……");
                    t = 0;
                    delay(1.5);
                }
            }
        } else {
            if (fail > 5) //连续翻几页没有点击成功则认为今天的新闻还没出来，学习昨天的
            {
                date_string = getTodayDateString();
                fail = 0;
                console.warn("没有找到当天文章，即将学习昨日新闻!");
                continue;
            }
            if (!textContains(date_string).exists()) //当前页面当天新闻
            {
                fail++; //失败次数加一
            }
            listView.scrollForward(); //向下滑动(翻页
            log("……翻页……");
            t = 0;
            delay(1.5);
        }
    }
}
/**
 * @description: “百灵”小视频学习函数
 * @param: vCount,vTime
 * @return: null
 */
function videoStudy_bailing(vCount, vTime) {
    h = device.height;//屏幕高
    w = device.width;//屏幕宽
    x = (w / 3) * 2;//横坐标2分之3处
    h1 = (h / 6) * 5;//纵坐标6分之5处
    h2 = (h / 6);//纵坐标6分之1处

    click("百灵");
    delay(2);
    click("竖");
    delay(2);
    var a = className("FrameLayout").depth(23).findOnce(0);//根据控件搜索视频框，但部分手机不适配，改用下面坐标点击
    a.click();
    //click((w/2)+random()*10,h/4);//坐标点击第一个视频
    delay(1);
    for (var i = 0; i < vCount; i++) {
        console.log("正在观看第" + (i + 1) + "个小视频");
        video_timing_bailing(i, vTime);//观看每个小视频
        if (i != vCount - 1) {
            swipe(x, h1, x, h2, 500);//往下翻（纵坐标从5/6处滑到1/6处）
        }
    }
    back();
    delay(2);
}

/**
 * @description:新闻联播小视频学习函数
 * @param: null
 * @return: null
 */
function videoStudy_news() {
    click("电视台");
    delay(1)
    click("联播频道");
    delay(2);
    var listView = className("ListView");//获取listView视频列表控件用于翻页
    let s = "中央广播电视总台";
    if (!textContains("中央广播电视总台")) {
        s = "央视网";
    }
    for (var i = 0, t = 1; i < vCount;) {
        if (click(s, t) == true) {
            console.log("即将学习第" + (i + 1) + "个视频!");
            var vvTime = randomNum(vTime, 10);
            video_timing_news(i, vvTime);//学习每个新闻联播小片段
            back();//返回联播频道界面
             while (!id("home_bottom_tab_button_work").exists());//等待加载出主页//等待加载出主页
            delay(1);
            i++;
            t++;
            if (i == 3) {//如果是平板等设备，请尝试修改i为合适值！
                listView.scrollForward();//翻页
                delay(2);
                t = 2;
            }
        }
        else {
            listView.scrollForward();//翻页
            delay(2);
            t = 3;
        }
    }
}

/**
 * @description: 阅读文章函数  
 * @param: null
 * @return: null
 */
function readToPage() {
    while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
    id("home_bottom_tab_button_work").findOne().click();//点击主页正下方的"学习"按钮
    delay(1);
    click("推荐");
    delay(1);
    var listView = className("ListView"); //获取文章ListView控件用于翻页
    while (!textContains("每日金句").exists()) {
        listView.scrollForward(); //翻页
        log("……翻页……");
        delay(2);
    }
    if (click("每日金句")) {
        console.log("开始进行阅读时长...");
        delay(1);
        article_timing(-1, pTime);

        back(); //返回主界面
    }
    console.log("阅读时长任务已完成...");
    return;
}

/**
 * @description: 听“电台”新闻广播函数  (视听学习+视听学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function listenToRadio() {
    click("电台");
    delay(1);
    click("听广播");
    delay(2);
    if (textContains("最近收听").exists()) {
        click("最近收听");
        console.log("正在收听广播...");
        delay(1);
        back();//返回电台界面
        return;
    }
    if (textContains("推荐收听").exists()) {
        click("推荐收听");
        console.log("正在收听广播...");
        delay(1);
        back();//返回电台界面
    }
}

/**
@description: 停止广播
@param: null
@return: null
*/
function stopRadio() {
    console.log("停止收听广播！");
    click("电台");
    delay(1);
    click("听新闻广播");
    delay(2);
    while (!(textContains("正在收听").exists() || textContains("最近收听").exists() || textContains("推荐收听").exists())) {
        log("等待加载");
        delay(1);
    }
    if (id("v_playing").exists()) {
        id("v_playing").findOnce(0).click();
        delay(1);
    }
}

/**
 * @description: 收藏加分享函数  (收藏+分享)---1+1=2分
 * @param: i-文章标号
 * @return: null
 */
function CollectAndShare(i) {
    while (!textContains("欢迎发表你的观点").exists())//如果没有找到评论框则认为没有进入文章界面，一直等待
    {
        delay(1);
        console.log("等待进入文章界面")
    }
    console.log("正在进行第" + (i + 1) + "次收藏和分享...");

    var textOrder = text("欢迎发表你的观点").findOnce().drawingOrder();
    var collectOrder = textOrder + 2;
    var shareOrder = textOrder + 3;
    var collectIcon = className("ImageView").filter(function (iv) {
        return iv.drawingOrder() == collectOrder;
    }).findOnce();

    var shareIcon = className("ImageView").filter(function (iv) {
        return iv.drawingOrder() == shareOrder;
    }).findOnce();

    //var collectIcon = classNameContains("ImageView").depth(10).findOnce(0);//右下角收藏按钮
   

    //var shareIcon = classNameContains("ImageView").depth(10).findOnce(1);//右下角分享按钮
    shareIcon.click();//点击分享
    while (!textContains("分享到学习强").exists());//等待弹出分享选项界面
    delay(1);
    click("分享到学习强国");
    delay(2);
    console.info("分享成功!");
    back();//返回文章界面
    delay(1);

    
}

/**
 * @description: 评论函数---2分
 * @param: i-文章标号
 * @return: null
 */
function Comment(i) {
    while (!textContains("欢迎发表你的观点").exists())//如果没有找到评论框则认为没有进入文章界面，一直等待
    {
        delay(1);
        console.log("等待进入文章界面")
    }
    click("欢迎发表你的观点");//单击评论框
    console.log("正在进行第" + (i + 1) + "次评论...");
    delay(1);
    var num = random(0, commentText.length - 1)//随机数
    setText(commentText[num]);//输入评论内容
    delay(1);
    click("发布");//点击右上角发布按钮
    console.info("评论成功!");
    delay(2);
    click("删除");//删除该评论
    delay(2);
    click("确认");//确认删除
    console.info("评论删除成功!");
    delay(1);
}


/**
 * @description: 本地频道
 * @param: null
 * @return: null
 */
function localChannel() {
       toastLog('开始执行本地频道任务');
       sleep(1000);
       while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
       id("home_bottom_tab_button_work").findOne().click();//点击主页正下方的"学习"按钮
       delay(2);
       className("android.widget.TextView").text("江苏").findOne().parent().click();
       delay(2);
       className("android.widget.TextView").text("江苏卫视").findOne().parent().click();
       delay(6);
       back();
       delay(3);
       toastLog('本地频道任务执行结束!');
       //点击学习控件回到新闻首页
       id("home_bottom_tab_button_work").findOne().click();
       sleep(1000);

};

/**
 * @description: 获取积分
 * @param: null
 * @return: null
 */
function getScores() {
    while (!id("home_bottom_tab_button_work").exists());//等待加载出主页
    console.info("正在获取积分...");
    while (!text("积分明细").exists()) {
        if (id("comm_head_xuexi_score").exists()) {
            id("comm_head_xuexi_score").findOnce().click();
        } else if (text("积分").exists()) {
            text("积分").findOnce().parent().child(1).click();
        }
        delay(3);
        text("积分明细").findOne().parent().click();
    }
    delay(3);
    let item = textContains("当日积分").findOne().parent().child(4).child(0);

    for (var i = 1; i < item.childCount(); i++) {
        let name = item.child(i).child(2).text();
        let str = item.child(i).child(3).text();
        let score = parseInt(str.match(/[0-9][0-9]*/g));
        if (name.search("订阅") != -1) {
            name = "订阅";
        }
        myScores[name] += score;
    }

    //console.log(myScores);

    if (customize_flag == false) {
        aCount = 6 - myScores["阅读文章"]; //文章个数
        pTime = (6 - myScores["文章时长"]) * 60;
        vCount = 6 - myScores["视听学习"];
        rTime = (6 - myScores["视听学习时长"]) * 60;
        asub = 2 - myScores["订阅"];
        sCount = 2 - myScores["分享"];
        cCount = 1 - myScores["发表观点"];
    }
    console.log('评论：' + cCount.toString() + '个');
    console.log('分享：' + sCount.toString() + '个');
    console.log('订阅：' + asub.toString() + '个');
    console.log('剩余文章：' + aCount.toString() + '篇');
    console.log('剩余文章学习时长：' + pTime.toString() + '秒');
    console.log('剩余视频：' + vCount.toString() + '个');
    console.log('剩视听学习时长：' + rTime.toString() + '秒');
    console.info("当日已获得积分：" + textContains("当日积分").findOne().parent().child(2).text());
    back();
    delays(1);
    back();
    delays(1);
}

/**
@description: 学习平台订阅
@param: null
@return: null
*/
function sub() {
    id("home_bottom_tab_button_work").findOne().click();//点击主页正下方的"学习"按钮
    delay(2);
    click("订阅");
    delay(2);
    click("添加");
    delay(2);
    click("学习平台", 0); // text("学习平台").findOne().click() == click("学习平台", 0) 解决订阅问题
    delay(0.5)
    click("强国号", 0)
    let sublist = className("ListView").findOnce(0);
    var i = 0;
    while (i < asub) {
        let object = desc("订阅").find();
        if (!object.empty()) {
            object.forEach(function (currentValue) {
                if (currentValue && i < asub) {
                    let like = currentValue.parent()
                    if (like.click()) {
                        console.log("订阅成功");
                        i++;
                        delay(2);
                    } else {
                        console.error("订阅失败");
                    }
                }
            })
        } else if (text("你已经看到我的底线了").exists()) {
            console.log("尝试订阅学习平台")
            back();
            delay(1);
            click("添加");
            delay(1);
            click("学习平台", 0);
            delay(2);
            let sublist = className("ListView").findOnce(1);
            while (i < asub) {
                let object = desc("订阅").find();
                if (!object.empty()) {
                    object.forEach(function (currentValue) {
                        if (currentValue && i < asub) {
                            let like = currentValue.parent()
                            if (like.click()) {
                                console.log("订阅成功");
                                i++;
                                delay(2);
                            } else {
                                console.error("订阅失败");
                            }
                        }
                    })
                } else if (text("你已经看到我的底线了").exists()) {
                    console.log("没有可订阅的强国号了,退出!!!")
                    back();
                    delay(2);
                    return;
                } else {
                    delay(1);
                    sublist.scrollForward();
                }
            }
        } else {
            delay(1);
            sublist.scrollForward();
        }
    }
    back();
    delay(2);
}

/**
 * @description: 启动app
 * @param: null
 * @return: null
 */
function start_app() {
    console.setPosition(0, device.height / 2);//部分华为手机console有bug请注释本行
    console.show();//部分华为手机console有bug请注释本行
    console.log("正在启动app...");
    if (!launchApp("学习强国"))//启动学习强国app
    {
        console.error("找不到学习强国App!");
        return;
    }
    while (!id("home_bottom_tab_button_work").exists()) {
        console.log("正在等待加载出主页");
        delay(1);
    }
    delay(1);
}

//主函数
function main() {
    if (!judge_tiku_existence()) {//题库不存在则退出
        return;
    }
    start_app();//启动app
    var start = new Date().getTime();//程序开始时间

    if (customize_flag == true) {
        //自定义学习，各项目执行顺序可换
        localChannel();//本地频道
        challengeQuestion();//挑战答题
        dailyQuestion();//每日答题
        videoStudy_news();//看视频
        listenToRadio();//听电台广播
        var r_start = new Date().getTime();//广播开始时间
        articleStudy();//学习文章，包含点赞、分享和评论
        if (rTime != 0) {
            listenToRadio();//继续听电台
        }
        var end = new Date().getTime();//广播结束时间
        var radio_time = (parseInt((end - r_start) / 1000));//广播已经收听的时间
        radio_timing(parseInt((end - r_start) / 1000), rTime - radio_time);//广播剩余需收听时间
    }
    else {
        getScores();//获取积分
       if (myScores['本地频道'] != 1) {
        localChannel();//本地频道
       }
        if (vCount != 0) {
            videoStudy_news();//看视频
        }
        if (rTime != 0) {
           listenToRadio();//听电台广播
        }
        var r_start = new Date().getTime();//广播开始时间
       if (myScores['订阅'] != 2) {
           sub();//订阅
       }
        if (myScores['挑战答题'] != 6) {
           challengeQuestion();//挑战答题
       }
        if (myScores['每日答题'] != 5) {
            dailyQuestion();//每日答题
        }
      if (myScores['每周答题'] != 5) {
        weeklyQuestion();
    }
    if (myScores['专项答题'] != 10) {
        specialQuestion();
    }
    if (myScores['双人对战'] != 2) {
        SRQuestion();//双人对战
        }  
    if (myScores['争上游答题'] != 5) {
        zsyQuestion();//争上游答题
        }
       articleStudy();//学习文章，包含分享和评论
       if (pTime > 0) {
        readToPage(); //文章挂时长
       }
        var end = new Date().getTime();//广播结束时间
        var radio_time = (parseInt((end - r_start) / 1000));//广播已经收听的时间
        radio_timing(parseInt((end - r_start) / 1000), rTime - radio_time);//广播剩余需收听时间
    }

    end = new Date().getTime();
    console.log("运行结束,共耗时" + (parseInt(end - start)) / 1000 + "秒");
}


/********************************************UI部分***********************************************/
auto.waitFor();//等待获取无障碍辅助权限
ui.layout(
    <vertical>
        <text textSize="20sp" layout_gravity="center" textColor="red" text="使用本程序前请先杀掉xxqg后台！" />
        <button id="all" h="90" text="完整运行" />
        <button id="customize" h="90" text="自定义运行（文章视频数量按照自定义值）" />
        <button id="cq" h="60" text="挑战答题" />
        <button id="dq" h="60" text="每日答题" />
        <button id="stop" h="70" text="停止运行" />

        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="文章学习类别:" />
            <input id="acatlog" text="" />
        </horizontal>

        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="文章数量(个):" />
            <input id="acount" w="30" text="" />
            <text textSize="16sp" marginLeft="15" textColor="black" text="视频数量(个):" />
            <input id="vcount" w="30" text="" />
        </horizontal>

        <horizontal>
            <text textSize="16sp" marginLeft="15" textColor="black" text="挑战答题轮数:" />
            <input id="lcount" w="30" text="" />
            <text textSize="16sp" marginLeft="15" textColor="black" text="挑战答题每轮答题数:" />
            <input id="qcount" w="30" text="" />
        </horizontal>


        <button w="250" layout_gravity="center" id="about" text="关于本助手" />
    </vertical>
);

ui.acatlog.setText(aCatlog.toString());
ui.acount.setText(aCount.toString());
ui.vcount.setText(vCount.toString());
ui.lcount.setText(lCount.toString());
ui.qcount.setText(qCount.toString());

var thread = null;

ui.all.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    toast("开始完整运行");
    thread = threads.start(function () {
        aCatlog = ui.acatlog.getText();
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        main();
    });
});

ui.customize.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    toast("开始自定义运行");
    thread = threads.start(function () {
        aCount = parseInt(ui.acount.getText());
        vCount = parseInt(ui.vcount.getText());
        aCatlog = ui.acatlog.getText();
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        customize_flag = true;
        console.log('文章数量：' + aCount.toString() + '篇')
        console.log('视频数量：' + vCount.toString() + '个')
        console.log('类别：' + aCatlog)
        main();
    });
});


ui.cq.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function () {
        lCount = parseInt(ui.lcount.getText());
        qCount = parseInt(ui.qcount.getText());
        start_app();
        challengeQuestion();
    });
});

ui.dq.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }
    thread = threads.start(function () {
        start_app();
        dailyQuestion();
    });
});

ui.stop.click(function () {
    if (thread != null && thread.isAlive()) {
        threads.shutDownAll();
        toast("已停止运行！")
        console.hide();
    }
    else {
        toast("当前没有线程在运行！")
    }
});
/*
ui.update.click(function () {
    if (thread != null && thread.isAlive()) {
        alert("注意!", "当前程序正在运行，请结束之前进程");
        return;
    }

    confirm("确认更新题库吗?")
    .then(c => {
        if(c){
            console.show();
            thread = threads.start(function () {
                updateTikunet()
            });
            console.hide();
        }
    });

});
*/

ui.about.click(function () {
    alert("xxqg-helper", "本脚本只可用于个人学习Auto.js，不得用于一切商业或违法用途，否则追究责任！造成的后果自负！\n 任何问题请上github交流!");
});


/*************************************************数据库部分******************************************************/

function indexFromChar(str) {
    return str.charCodeAt(0) - "A".charCodeAt(0);
}

/**
 * @description: 判断题库是否存在
 * @param: null
 * @return: null
 */
function judge_tiku_existence() {
    var dbName = "tiku.db";//题库文件名
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库！请将题库文件放置与js文件同一目录下再运行！");
        return false;
    }
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOT EXISTS tikuNet(\
    question CHAR(253),\
    answer CHAR(100)\
    );";
    db.execSQL(createTable);
    return true;
}
/**
 * @description: 从数据库中搜索答案
 * @param: question 问题
 * @return: answer 答案
 */
function  getAnswer(question, table_name)
{
    //数据文件名
    var dbName="tiku.db";
    //文件路径
    var path=files.path(dbName);
    //确保文件存在
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
        return '';
    }
    //创建或打开数据库
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    sql = "SELECT answer FROM " + table_name + " WHERE question LIKE '" + question + "%'"
    //log(sql)
    var cursor = db.rawQuery(sql, null);

    if(cursor.moveToFirst()){
        var answer=cursor.getString(0);
        cursor.close();
        return answer;
    }
    else{
        console.error( table_name +"表题库中未找到答案");
        cursor.close();
        return '';
    }
}

/**
 * @description: 增加或更新数据库
 * @param: sql
 * @return: null
 */
function insertOrUpdate(sql) {
    var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    db.execSQL(sql);
    db.close();
}

function indexFromChar(str) {
    return str.charCodeAt(0) - "A".charCodeAt(0);
}


/**
 * @description: 更新网络数据库tikuNet表
 * @param  {} liArray li列表，包含题目和答案
 */
function CreateAndInsert(liArray){
    
    var dbName = "tiku.db";
    //文件路径
    var path = files.path(dbName);
    //确保文件存在
    if (!files.exists(path)) {
        files.createWithDirs(path);
    }
    //创建或打开数据库
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOt EXISTS tikuNet(\
    question CHAR(253),\
    answer CHAR(100)\
    );";
    var cleanTable = "DELETE FROM tikuNet";
    db.execSQL(createTable);
    db.execSQL(cleanTable);
    log("清空tikuNet表题库，更新网络题库!");

    var sql = "INSERT INTO tikuNet (question, answer) VALUES (?, ?)";
    db.beginTransaction();
    var stmt = db.compileStatement(sql);
    for (var li = 0, len = liArray.length; li < len; li++) {
        //log("题目："+li.text());
        var tiMu = liArray[li].content;
        var daAn = liArray[li].answer;
        var xuanXiang = liArray[li].options;
        tiMu = tiMu + xuanXiang;
        //log(util.format("题目:%s\n答案:%s"),tiMu,daAn);
        stmt.bindString(1, tiMu);
        stmt.bindString(2, daAn);
        stmt.executeInsert();
        stmt.clearBindings();
    }
    db.setTransactionSuccessful();
    db.endTransaction();
    db.close();  
    return true;  
}


/** 更新数据库
 */
function updateTikunet() {
    log("开始更新数据库...");
    console.info("如需更新请每日一更即可，忽反复更新");
    var htmlArray = http.get("https://cdn.jsdelivr.net/gh/lolisaikou/tiku-autoupdate/questions.json");
    var liArray = htmlArray.body.json();
    //log(util.format("题库数目%s\n"), liArray.size());    
    //执行更新
    if(CreateAndInsert(liArray))
    {
        console.log(util.format("题库数量已更新至：%s\n"), liArray.length+"条！");    
        console.log("-----------------------------------------------------------");
        return liArray.length;
        
    }else{
        return -1;
    }   
}
/*************************************************挑战答题部分******************************************************/

/**
 * @description: 每次答题循环
 * @param: conNum 连续答对的次数
 * @return: null
 */
function challengeQuestionLoop(conNum)
{
    var delayTime=(parseInt(Math.random()*5,10)+1);//产生随机数
    if(conNum>=qCount)//答题次数足够退出，每轮5次
    {
        let listArray = className("ListView").findOnce().children();//题目选项列表
        let i=random(0,listArray.length-1);
        console.log("本轮次数足够，随机点击一个答案，答错结束答题");
        listArray[i].child(0).click();//随意点击一个答案
        console.log("-----------------------------------------------------------");
        return;
    }
    delay(2);
    if (className("ListView").exists()){
        var question = className("ListView").findOnce().parent().child(0).text();
        console.log((conNum+1).toString()+".题目："+question);
    }
    else{
        console.error("提取题目失败!");
        let listArray = className("ListView").findOnce().children();//题目选项列表
        let i=random(0,listArray.length-1);
        console.log("随机点击一个");
        listArray[i].child(0).click();//随意点击一个答案
        return;
    }
    var chutiIndex = question.lastIndexOf("出题单位");
    if (chutiIndex != -1) {
        question = question.substring(0, chutiIndex - 2);
    }
    question = question.replace(/\s/g, "");
    var options=[];//选项列表
    if (className("ListView").exists()) {
        className("ListView").findOne().children().forEach(child => {
            var answer_q = child.child(0).child(1).text();
            options.push(answer_q);
        });
    } else {
        console.error("答案获取失败!");
        return;
    }
    /*var optionStr = options.join("_");
    question = question + "%" + optionStr;*/
    var answer = getAnswer(question, 'tiku');
    if (answer.length == 0) {//tiku表中没有则到tikuNet表中搜索答案
        answer = getAnswer(question, 'tikuNet');
    }
    
    if (/^[a-zA-Z]{1}$/.test(answer)) {//如果为ABCD形式
        var indexAnsTiku = indexFromChar(answer.toUpperCase());
        answer = options[indexAnsTiku];
        console.info("答案: "+ answer);
    } else{
        console.info("答案："+ answer);}

    let hasClicked=false;
    let listArray = className("ListView").findOnce().children();//题目选项列表
    if(answer=="")//如果没找到答案
    {
        let i=random(0,listArray.length-1);
        console.error("没有找到答案，随机点击一个");
        delay(delayTime);
        listArray[i].child(0).click();//随意点击一个答案
        hasClicked=true;
        console.log("-----------------------------------------------------------");
    }
    else//如果找到了答案
    {
        listArray.forEach(item => {
            var listDescStr = item.child(0).child(1).text();
            if (listDescStr == answer) {
                delay(delayTime);
                item.child(0).click();//点击答案
                hasClicked=true;
                console.log("-----------------------------------------------------------");
            }
        });
    }
    if(!hasClicked)//如果没有点击成功
    {
        console.error("未能成功点击，随机点击一个");
        let i=random(0,listArray.length-1);
        delay(delayTime);
        listArray[i].child(0).click();//随意点击一个答案
        console.log("-----------------------------------------------------------");
    }
}

/**
 * @description: 挑战答题
 * @param: null
 * @return: null
 */
function challengeQuestion()
{
    var f=0;
    console.log("-----------------------------------------------------------");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    console.log("开始挑战答题");
    text("我的").click();
    while(!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while(!text("答题竞赛").exists());
    delay(1);
    var ob= text("答题竞赛").findOne().parent();
    var index = ob.childCount() - 1;
    ob.child(index).click();
    delay(4);
    let conNum=0;// 连续答对的次数
    let lNum=0;// 轮数
    while (true) {
        delay(1)
        while (!className("RadioButton").exists()) {
            console.log("正在等待加载题目界面!");
        }
        challengeQuestionLoop(conNum);
        delay(randomNum(3, 6));
        if(text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw"+
        "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists())//遇到?号，则答错了,不再通过结束本局字样判断
        {
            if (conNum >= qCount) {
                lNum++;
            }
            if(lNum>=lCount ){
                console.log("挑战答题结束！返回主页！");
                back();delay(2);
                back();delay(2);
                back();delay(2);
                back();delay(2);
                while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                    f++;
                    console.log("正在等待加载出主页");
                    delay(1);
                    if(f>5){
                        back();
                        var f=0;}}
                break;
            }
            else{
                for (var i = 8; i >= 0; i--) {
                    console.log("等"+i+"秒开始下一轮...")
                    delay(1);
                }
                delay(1); 
                click("结束本局");
                delay(1);
                text("再来一局").waitFor();
                click("再来一局");
                delay(5);
                if (conNum < 5) {
                    conNum = 0;
                }
            }
        }
        else//答对了
        {
            conNum++;
        }
    }
    console.log("结束挑战答题，返回进行下个任务!");
}

/*************************************************每日答题部分***************************************************/

/**
 * @description: 获取填空题题目数组
 * @param: null
 * @return: questionArray
 */
function getFitbQuestion() {
    let questionArray = [];
    if (textStartsWith("填空题").exists()) {
        let questionCollections = className("EditText").findOnce().parent().parent();
        if (questionCollections.childCount() == 1) {//法1
            questionCollections = className("EditText").findOnce().parent();
            let findBlank = false;
            let blankCount = 0;
            let blankNumStr = "";
            questionCollections.children().forEach(item => {
                if (item.className() != "android.widget.EditText") {
                    if (item.text() != "") { //题目段
                        if (findBlank) {
                            blankNumStr = "|" + blankCount.toString();
                            //log(blankNumStr);
                            questionArray.push(blankNumStr);
                            findBlank = false;
                            blankCount=0;
                        }
                        //log(item.desc());
                        questionArray.push(item.text());
                    } else {
                        findBlank = true;
                        blankCount += 1;
                    }
                }
            });
            // toastLog("法1" + questionArray);
        } else {//法2   
            questionCollections.children().forEach(item => {
                if (item.childCount() == 0) { //题目段
                    questionArray.push(item.text());
                } else {
                    let blankNumStr = "|" + (item.childCount() - 1).toString();
                    questionArray.push(blankNumStr);
                }
            });
            // toastLog("法2" + questionArray);
        }
    } else { //选择题
        let questionCollections = className("ListView").findOnce().parent().child(1);
        questionArray.push(questionCollections.text());
    }
    return questionArray;
}

/**
 * @description: 获取选择题题目数组
 * @param: null
 * @return: questionArray
 */
function getChoiceQuestion() {
    var questionCollections = className("ListView").findOnce().parent().child(1);
    var questionArray = [];
    questionArray.push(questionCollections.text());
    return questionArray;
}

/**
 * @description: 获取提示字符串
 * @param: null
 * @return: tipsStr
 */
function getTipsStr() {
    let tipsStr = "";
    while (tipsStr == "") {
        if (className("android.view.View").text("提示").exists()) { //正确捕获提示
            let tipsLine = text("提示").findOnce().parent();
            //获取提示内容
            let tipsView = tipsLine.parent().child(1).child(0);
            tipsStr = tipsView.text();
            //关闭提示
            tipsLine.child(1).click();
            break;
        }
        if (className("android.view.View").text("查看提示").exists()) {
            let seeTips = text("查看提示").findOnce();
            seeTips.click();
            sleep(1000);
            click(device.width * 0.5, device.height * 0.41);
            sleep(800);
            click(device.width * 0.5, device.height * 0.35);
        } else {
            log("未找到查看提示");
            //continue;
        }

    }
    return tipsStr;
}

/**
 * @description: 从提示中获取填空题答案
 * @param: timu, tipsStr
 * @return: ansTips
 */
function getAnswerFromTips(timu, tipsStr) {
    var ansTips = "";
    for (var i = 1; i < timu.length - 1; i++) {
        if (timu[i].charAt(0) == "|") {
            var blankLen = timu[i].substring(1);
            var indexKey = tipsStr.indexOf(timu[i + 1]);
            var ansFind = tipsStr.substr(indexKey - blankLen, blankLen);
            ansTips += ansFind;
        }
    }
    return ansTips;
}

/**
 * @description: 根据提示点击选择题选项
 * @param: tipsStr
 * @return: clickStr
 */
function clickByTips(tipsStr) {
    var delayTime=(parseInt(Math.random()*5,10)+1);//产生随机数
    var clickStr = "";
    var isFind = false;
    if (className("ListView").exists()) {
        var listArray = className("ListView").findOne().children();
        listArray.forEach(item => {
            var ansStr = item.child(0).child(2).text();
            if (tipsStr.indexOf(ansStr) >= 0) {
                delay(0.5);
                item.child(0).click();
                clickStr += item.child(0).child(1).text().charAt(0);
                isFind = true;
            }
        });
        if (!isFind) { //没有找到 点击第一个
            delay(delayTime);
            listArray[0].child(0).click();
            clickStr += listArray[0].child(0).child(1).text().charAt(0);
        }
    }
    return clickStr;
}

/**
 * @description: 根据答案点击选择题选项
 * @param: answer
 * @return: null
 */
function clickByAnswer(answer) {
    var delayTime=(parseInt(Math.random()*5,10)+1);//产生随机数
    if (className("ListView").exists()) {
        var listArray = className("ListView").findOnce().children();
        listArray.forEach(item => {
            var listIndexStr = item.child(0).child(1).text().charAt(0);
            //单选答案为非ABCD
            var listDescStr = item.child(0).child(2).text();
            if (answer.indexOf(listIndexStr) >= 0 || answer == listDescStr) {
                delay(delayTime);
                item.child(0).click();
            }
        });
    }
}

/**
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer
 * @return: null
 */
function checkAndUpdate(question, ansTiku, answer) {
    if (text("答案解析").exists()) {//答错了
        try{
            delay(delayTime);
            swipe(100, device.height - 100, 100, 100, 500);
        }catch(e){}
        var nCout = 0
        while (nCout < 5) {
            if (textStartsWith("正确答案").exists()) {
                var correctAns = textStartsWith("正确答案").findOnce().text().substr(6);
                console.info("正确答案是：" + correctAns);
                if (ansTiku == "") { //题库为空则插入正确答案                
                    var sql = "INSERT INTO tiku VALUES ('" + question + "','" + correctAns + "','')";
                } else { //更新题库答案
                    var sql = "UPDATE tiku SET answer='" + correctAns + "' WHERE question LIKE '" + question + "'";
                }
                insertOrUpdate(sql);
                console.log("修正答案更新题库答案...");
                delay(1);
                break;
            } else {
                try{
                    var clickPos = className("android.webkit.WebView").findOnce().child(2).child(0).child(1).bounds();
                    click(clickPos.left + device.width * 0.13, clickPos.top + device.height * 0.1);
                    console.error("未捕获正确答案，尝试修正");
                }catch(e){continue;}
            }
            nCout++;
        }
        if (className("Button").exists()) {
            //delay(delayTime);
            className("Button").findOnce().click();
        } else {
            //delay(delayTime);
            click(device.width * 0.85, device.height * 0.06);
        }
    } else { //正确后进入下一题，或者进入再来一局界面
        if (ansTiku == "" && answer != "") { //正确进入下一题，且题库答案为空              
            var sql = "INSERT INTO tiku VALUES ('" + question + "','" + answer + "','')";
            insertOrUpdate(sql);
            console.log("更新题库答案...");
        }
    }
}


/**
 * @description: 每日答题循环
 * @param: null
 * @return: null
 */
function dailyQuestionLoop() {
    var delayTime=(parseInt(Math.random()*5,10)+1);//产生随机数
    if (textStartsWith("填空题").exists()) {
        var questionArray = getFitbQuestion();
    }
    else if (textStartsWith("多选题").exists() || textStartsWith("单选题").exists() || textStartsWith("多选题 (10分)").exists()) {
        var questionArray = getChoiceQuestion();
    }

    var blankArray = [];
    var question = "";
    questionArray.forEach(item => {
        if (item != null && item.charAt(0) == "|") { //是空格数
            blankArray.push(item.substring(1));
        } else { //是题目段
            question += item;
        }
    });
    question = question.replace(/\s/g, "");
    console.log("题目：" + question);
    delay(2);

    var ansTiku = getAnswer(question, 'tiku');
    if (ansTiku.length == 0) {//tiku表中没有则到tikuNet表中搜索答案
        ansTiku = getAnswer(question, 'tikuNet');
    }

    var answer = ansTiku.replace(/(^\s*)|(\s*$)/g, "");

 if (textStartsWith("填空题").exists()) {
        if (answer == "") { //答案空，前面题库未找到答案,找提示
            var tipsStr = getTipsStr();
            answer = getAnswerFromTips(questionArray, tipsStr);
            console.info("提示答案：" + answer);
            var answerinput = className("EditText").findOnce(0).parent().child(0);//修改填空题的输入方法
            var answer_i = answer.substr(0, blankArray[0]);
            answerinput.setText(answer_i);
            delay(0.3);
            if (blankArray.length > 1) {
                for (var i = 1; i < blankArray.length; i++) {
                    var answerinput = className("EditText").findOnce(i).parent().child(0);
                    var answer_i = answer.substr(blankArray[i - 1], blankArray[i]);
                    //console.log(answer_i);//调试用
                    answerinput.setText(answer_i);
                    delay(0.3);
                }
            }

        } else { //答案非空，题库中已找到答案
            console.info("答案：" + answer);
            //console.log("空格数："+blankArray.length);//调试用
            var answerinput = className("EditText").findOnce(0).parent().child(0);//修改填空题的输入方法
            var answer_i = answer.substr(0, blankArray[0]);
            answerinput.setText(answer_i);
            delay(0.3);
            if (blankArray.length > 1) {
                for (var i = 1; i < blankArray.length; i++) {
                    var answerinput = className("EditText").findOnce(i).parent().child(0);
                    var answer_i = answer.substr(blankArray[i - 1], blankArray[i]);
                    //console.log(answer_i);//调试用
                    answerinput.setText(answer_i);
                    delay(0.3);
                }
            }
        }
    }
    else if (textStartsWith("多选题").exists() || textStartsWith("单选题").exists()) {
        if (answer == "") {
            var tipsStr = getTipsStr();
            answer = clickByTips(tipsStr);
            console.info("提示中的答案：" + answer);
        } else {
            console.info("答案：" + ansTiku);
            clickByAnswer(answer);
        }
    }

    delay(0.5);

     if (text("确定").exists()) {
        delay(delayTime);
        text("确定").click();
        delay(0.5);
        if (text("下一题").exists()){
        delay(delayTime);
        click("下一题");
        delay(0.5);}
        if (text("完成").exists()) {
        delay(delayTime);
        text("完成").click();
        delay(0.5);}
    } else if (text("下一题").exists()){
        delay(delayTime);
        click("下一题");
        delay(0.5);
    } else if (text("完成").exists()) {
        delay(delayTime);
        text("完成").click();
        delay(0.5);
    } else {
        console.warn("未找到右上角确定按钮控件，根据坐标点击");
        delay(delayTime);
        click(device.width * 0.85, device.height * 0.06);//右上角确定按钮，根据自己手机实际修改
        if (text("下一题").exists()){
        delay(delayTime);
        click("下一题");
        delay(0.5);}
        if (text("完成").exists()) {
        delay(delayTime);
        text("完成").click();
        delay(0.5);}
    }

    checkAndUpdate(question, ansTiku, answer);
    console.log("-----------------------------------------------------------");
    delay(2);
}

/**
 * @description: 每日答题
 * @param: null
 * @return: null
 */
function dailyQuestion() 
{
    var f=0;
    console.log("-----------------------------------------------------------");
    console.log("开始每日答题");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    text("我的").click();
    while (!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while (!text("每日答题").exists());
    delay(2);
    text("每日答题").click();
    delay(2);
    let dlNum = 0;//每日答题轮数
    while (true) {
        while(!textStartsWith("查看提示").exists())
         {
           console.log("正在等待加载题目界面!");
           delay(1);
           if(className("android.view.View").text("答案解析").exists()){
               if (text("下一题").exists()){
                  click("下一题");
                  delay(0.5);}
               if (text("完成").exists()) {
                  text("完成").click();
                  delay(0.5);}
            }
         }
        dailyQuestionLoop();
        delay(1);
        if (text("再来一组").exists()) {
            delay(1);
            dlNum++;
            if (!text("领取奖励已达今日上限").exists()) {
                text("再来一组").click();
                console.info("第" + (dlNum + 1).toString() + "轮答题:");
                delay(1);
            }
            else {
                console.log("每日答题结束！返回主页！")
                text("返回").click(); delay(1);
                back(); delay(1);
                back(); delay(1);
                delay(0.5);
                while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                   f++;
                   console.log("正在等待加载出主页");
                   delay(1);
                   if(f>2){
                      back();
                      var f=0;}
                   if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                      f=0;
                      break;}}
                break;
            }
        }
    }
    console.log("结束每日答题，返回进行下个任务!");
}


/**
 * @description: 每周答题
 * @param: null
 * @return: null
 */
function weeklyQuestion()
{   
    var f=0;
    console.log("-----------------------------------------------------------");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    console.log("开始每周答题");
    let dlNum=0;//每周答题轮数
    text("我的").click();
    while(!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while(!text("每周答题").exists());
    delay(1);
    //找到每周答题控件，点击进入
    text("每周答题").findOne().click();
    delay(2);
    while(text("未作答").findOnce()==null)
    {
        if(className("android.view.View").text("您已经看到了我的底线").exists())
        {
            console.log("界面已到底,没有题目结束答题");
            delay(1);
           // back();//退到答题种类
            while(className("android.view.View").text("您已经看到了我的底线").exists())//如果还在每周答题列表则执行返回上级
            {
                delay(0.5);
                if(className("android.view.View").text("您已经看到了我的底线").exists())
                {
                back();//退到答题种类
                delay(0.5);
                }
                break;
            }
            delay(1);
            back();//退到我的
            delay(1);
            back();//退到主页
            delay(0.5);
            while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                f++;
                console.log("正在等待加载出主页");
                delay(1);
                if(f>2){
                   back();
                   var f=0;}
                if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                   f=0;
                    break;}}
            delay(0.5);
            return;
        }
        console.info("   ( ´◔ ‸◔`)  向下翻页!");
        className("android.view.View").scrollable(true).findOne().scrollDown();
        delay(0.5);
    }
    text("未作答").findOnce().click();
    delay(3);
    while(className("android.view.View").text("查看提示").exists())
         {
           //console.log("正在等待加载题目界面!");
           delay(1);
           dailyQuestionLoop();
           dlNum++;
           delay(2);
         }      
    //console.info("等候3s加载页面...")
    delay(1);
    if(text("领取奖励已达今日上限").exists())
    {
        //log("出现 领取奖励已达今日上限")
        delay(1);
        var ret = className("android.widget.Button").text("返回").findOne();//bounds = (99,1165,533,1286)
        delay(2);
        ret.click();
        delay(1);
        back();
        delay(1);
        back();//退到我的
        delay(1);
        console.log("每周答题任务执行结束！(￣▽￣*)")
        back();//退到 主页
        delay(0.5);
        while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f++;
           console.log("正在等待加载出主页");
           delay(1);
           if(f>2){
              back();
              var f=0;}
           if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
              f=0;
              break;}}
        delay(1);
    }
    else{
        console.log("和分奖励未达到上限，继续答题!")
        delay(1);
        while(className("android.view.View").text("本次答对题目数").exists()){ 
            className("android.widget.Button").text("返回").findOne().click();
            break;
           }
        delay(1);
        console.info("进行第" + (dlNum + 1).toString() + "轮答题:");
        while(text("未作答").findOnce()==null)
        {
            if(className("android.view.View").text("您已经看到了我的底线").exists())
            {
            console.log("界面已到底,没有题目结束答题");
            /*back();//退到答题种类
            delay(1);
            back();//退到我的
            delay(1);
            back();//退到主页*/
            delay(1);
            return;
            }
            console.info("   ( ´◔ ‸◔`)  向下翻页!");
            className("android.view.View").scrollable(true).findOne().scrollDown();
            delay(0.5);
        }
        
        text("未作答").findOnce().click();
        delay(3);
        //再来一组
        while(className("android.view.View").text("查看提示").exists())
         {
           //console.log("正在等待加载题目界面!");
           delay(1);
           dailyQuestionLoop();
           delay(2);
         }
        //console.log("等候3s加载页面...");
        delay(1);
        //两组结束，直接回退
        var ret = className("android.widget.Button").text("返回").findOne();//bounds = (99,1165,533,1286)
        delay(1);
        ret.click();//题目列表
        delay(1);
        back();//答题类型
        delay(1);
        back();//退到 我的
        delay(1);
        console.log("每周答题任务执行结束！(￣▽￣*)");
        back();//退到 主页
        delay(0.5);
        while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
            f++;
            console.log("正在等待加载出主页");
            delay(1);
            if(f>2){
                back();
                var f=0;}
            if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                f=0;
                break;}}
        delay(1);
    }
    console.log("结束每周答题，返回进行下个任务!");
}

/**
 * @description: 专项答题
 * @param: null
 * @return: null
 */
function specialQuestion()
{
    var f=0;
    console.log("-----------------------------------------------------------");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    console.log("开始专项答题");
    //let dlNum=0;//每周答题轮数
    text("我的").click();
    while(!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while(!text("专项答题").exists());
    delay(1);
    //找到每周答题控件，点击进入
    text("专项答题").findOne().click();
    delay(2);
    var overdue = 0;
    while(text("开始答题").findOnce()==null )
    {
        if(text("已过期").findOnce()!=null)
        {    
            overdue++;
            delay(1);
            if(overdue>4){
            console.log("检测到4个以上已过期题目，自动退出专项答题...");
            delay(2);
            back();//退到答题种类
            delay(1);
            if (text("查看解析").exists()) {
                back();//退到我的
                delay(1);
                }
            back();//退到我的
            delay(1);
            if (text("答题记录").exists()) {
                back();//退到我的
                delay(1);
                }
            delay(1);
            back();//退到主页
            delay(0.5);
            while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                f++;
                console.log("正在等待加载出主页");
                delay(1);
                if(f>2){
                   back();
                   var f=0;}
                if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                   f=0;
                   break;}}
            delay(0.5);
            return;
            }
        }
        console.info("   ( ´◔ ‸◔`)  向下翻页!");
        className("android.view.View").scrollable(true).findOne().scrollDown();
        delay(0.5);
    }
    if(text("继续答题").findOnce()!=null)
         text("继续答题").findOnce().click();
    else if(text("开始答题").findOnce()!=null)
         text("开始答题").findOnce().click();
    delay(5);
    while(className("android.view.View").text("剩余时间").exists())
         {
           //console.log("正在等待加载题目界面!");
           delay(1);
           dailyQuestionLoop();
           delay(1);
         } 
           //console.log("测试A");
    delay(1);
    if(className("android.view.View").text("领取奖励已达今日上限").exists())
    {
        //console.log("测试1");
        //log("出现 领取奖励已达今日上限")
        delay(2);
        back();
        delay(1);
        if (text("查看解析").exists()) {
                back();//退到我的
                delay(0.5);
                }
        back();
        delay(1);
        back();//退到我的
        delay(1);
        console.log("专项答题任务执行结束！(￣▽￣*)")
        back();//退到 主页
        delay(0.5);
        while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
            f++;
            console.log("正在等待加载出主页");
            delay(1);
            if(f>5){
                back();
                var f=0;}}
        delay(1);
    }
    else{
        console.log("和分奖励未达到上限，继续答题!")
        delay(1);
        while(className("android.view.View").text("本次作答分数").exists()){
            delay(1);
            back();
            //console.log("测试");
            break;
        }
        //back();//回到每周答题列表
        delay(1);
        console.info("进行第2轮答题:");
        while(text("开始答题").findOnce()==null)
        {
            if(text("已过期").findOnce()!=null)
              {    
                overdue++;
                delay(1);
                if(overdue>4){
                   console.log("检测到4个以上已过期题目，自动退出专项答题...");
                   delay(2);
                   back();//退到答题种类
                   delay(1);
                   if (text("查看解析").exists()) {
                       back();//退到我的
                       delay(1);}
                   back();//退到我的
                   delay(1);
                   if (text("答题记录").exists()) {
                       back();//退到我的
                       delay(1);}
                   delay(1);
                   back();//退到主页
                   delay(0.5);
                   if(!(desc("学习").exists() || desc("工作").exists())){
                       delay(1);
                       back();//返回主页界面
                       }
                   delay(0.5);
                   while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                       f++;
                       console.log("正在等待加载出主页");
                       delay(1);
                       if(f>5){
                          back();
                          var f=0;}}
                   return;
                   }
              }
            console.info("   ( ´◔ ‸◔`)  向下翻页!");
            className("android.view.View").scrollable(true).findOne().scrollDown();
            delay(0.5);
        }
        if(text("继续答题").findOnce()!=null)
            text("继续答题").findOnce().click();
        else if(text("开始答题").findOnce()!=null)
            text("开始答题").findOnce().click();
        delay(5);
        //再来一组
        while(className("android.view.View").text("剩余时间").exists())
         {
           //console.log("正在等待加载题目界面!");
           delay(1);      
           dailyQuestionLoop();
           delay(1);
         }
        //console.log("等候3s加载页面...");
        delay(1);
        //两组结束，直接回退
        back()//到专项答题列表页面
        delay(1);
        if (text("查看解析").exists()) {
                back();//退到我的
                delay(0.5);
              }
        back();//答题类型
        delay(1);
        back();//退到 我的
        delay(1);
        console.log("专项答题任务执行结束！(￣▽￣*)");
        back();//退到 主页
        delay(0.5);
        while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
            f++;
            console.log("正在等待加载出主页");
            delay(1);
            if(f>5){
                back();
                var f=0;}}
        delay(1);
    }
}


/**
 * @description: 每日/每周/专项/挑战答题
 * @param: null
 * @return: null
 */
function Manualanswer() {
    console.setPosition(0,device.height/2);//部分华为手机console有bug请注释本行
    console.show();//部分华为手机console有bug请注释本行
    console.log("开始答题，等待题目界面…");
    let HHNum = 0;//答题轮数
    let conNum = 0;//连续答对的次数
    let lNum = 0;//轮数
    while (true) {
        delay(1);
        while(!(textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists() || className("RadioButton").exists() ||textContains("距离答题结束").exists() )) {
            toastLog("没有找到题目！请检查是否进入答题界面！");
            delay(2);
        }
        while((textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists())) {
            delay(1);
            dailyQuestionLoop();
            delay(1);
        }
        while (className("RadioButton").exists()){
            delay(1);
            zsyQuestionLoop();
            delay(1);
        }/*
        while(className("RadioButton").exists()) {
            delay(1);
            zsyQuestionLoop();
            delay(1);
            if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
            "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists())//遇到❌号，则答错了,不再通过结束本局字样判断
            {
            if (conNum >= 5) {
                lNum++;
            }
            if (lNum >= 1) {
                console.log("挑战答题结束！");
                back();
                delay(1);
                //back();
                break;
            }
            else {
                console.log("出现错误，等5秒开始下一轮...")
                delay(3);//等待5秒才能开始下一轮
                back();
                //desc("结束本局").click();//有可能找不到结束本局字样所在页面控件，所以直接返回到上一层
                delay(2);
                text("再来一局").click()
                delay(4);
                if (conNum < 5) {
                    conNum = 0;
                }
            }
            }
           else//答对了
           {
            conNum++;
           }
        }*/
        if (text("再练一次").exists() || text("再来一局").exists() || text("继续挑战").exists() ) {
            console.log("b答题结束！")
            back();delay(0.5);
            back();
            break;
        } else if (text("查看解析").exists()) {
            console.log("a答题结束！")
            back();delay(0.5);
            back();delay(0.5);
            break;
        } else if (text("再来一组").exists()) {
            delay(2);
            HHNum++;
            if (!text("领取奖励已达今日上限").exists()) {
                text("再来一组").click();
                console.info("第" + (HHNum + 1).toString() + "轮答题:");
                delay(1);
            }
            else {
                console.log("c答题结束！")
                text("返回").click(); delay(2);
                break;
            }
        }
    }
}


/*************************************************竞赛答题部分***************************************************/

  var oldaquestion;
/**
 * @description: 争上游答题 双人对战答题循环
 * @param: null
 * @return: null
 */
 //循环1 基于延时进行题目刷新做题，4+0.3秒，结束偶尔故障;20201022修改为基于前后题目判断
 function zsyQuestionLoop() {
    delay(0.5);//4-0.5，前置0.5延时判断结束标志
   if (!className("RadioButton").exists() || className("android.view.View").text("继续挑战").exists() || textContains("继续挑战").exists() ){//不存在本局结束标志 继续挑战，则执行  
      console.info("答题结束!");
      return;
   } else {
     while(!className("RadioButton").exists());//@KB64ba建议使用while判断
     if (className("RadioButton").exists() || aquestion.length == 0) {
         delay(0.3);
         var aquestion = className("ListView").findOnce().parent().child(0).text();
         var question = aquestion.substring(3); //争上游和对战题目前带1.2.3.需去除
         while (aquestion == oldaquestion || question == "") {
          delay(0.8);
          if ( !className("RadioButton").exists() || textContains("继续挑战").exists()) {	
          console.info("答题结束!");
          return;
          }
          aquestion = className("ListView").findOnce().parent().child(0).text();
          question = aquestion.substring(3);
        }       
       }else {
         console.error("提取题目失败!");
         let listArray = className("ListView").findOnce().children();//题目选项列表
         let i = random(0, listArray.length - 1);
         console.log("随机点击");
         listArray[i].child(0).click();//随意点击一个答案
         return;
       } 
       var chutiIndex = question.lastIndexOf("出题");//@chongyadong添加
     if (chutiIndex != -1) {
         question = question.substring(0, chutiIndex - 2);
       }
       question = question.replace(/\s/g, "");
     var options = [];//选项列表
     if (className("RadioButton").exists()) {
         className("ListView").findOne().children().forEach(child => {
             var answer_q = child.child(0).child(1).text();
             options.push(answer_q);
         });
     } else {
         console.error("答案获取失败!");
         return;
     }
     if (aquestion != oldaquestion){ 
     console.log(aquestion.substring(0,2) + "题目:" + question);
     var answer = getAnswer(question, 'tiku');
      if (answer.length == 0) {//tiku表中没有则到tikuNet表中搜索答案
         answer = getAnswer(question, 'tikuNet');
       }
     //console.info("答案：" + answer);
      if (/^[a-zA-Z]{1}$/.test(answer)) {//如果为ABCD形式
         var indexAnsTiku = indexFromChar(answer.toUpperCase());
         answer = options[indexAnsTiku];
         console.info("答案：" + answer);
       }else{
         console.info("答案：" + answer);
       }
     let hasClicked = false;
     let listArray = className("ListView").findOnce().children();//题目选项列表
    /* if (answer == "")*/ //如果没找到答案
       if(answer.length ==0){
         let i = random(0, listArray.length - 1);
         console.error("没有找到答案，随机点击");
         listArray[i].child(0).click();//随意点击一个答案
         hasClicked = true;
         console.log("---------------------------");
        }else{//如果找到了答案 该部分问题: 选项带A.B.C.D.，题库返回答案不带，char返回答案带
         var answer_a = answer.substring(0,2);//定义answer_a，获取答案前两个字符对比A.B.C.D.应该不会出现E选项
         if(answer_a == "A." || answer_a == "B." || answer_a == "C." || answer_a =="D."){
             listArray.forEach(item => {
             var listDescStrb = item.child(0).child(1).text();
             if (listDescStrb == answer) {
                 item.child(0).click();//点击答案
                 hasClicked = true;
                 console.log("---------------------------");
               }
             });
           }else{
            listArray.forEach(item => {
             var listDescStra = item.child(0).child(1).text();
             var listDescStrb = listDescStra.substring(3);//选项去除A.B.C.D.再与answer对比
             if (listDescStrb == answer) {
                 item.child(0).click();//点击答案
                 hasClicked = true;
                 console.log("---------------------------");
              }
            });
         }
      }
     if (!hasClicked)//如果没有点击成功
      {
         console.error("未能成功点击，随机点击");
         let i = random(0, listArray.length - 1);
         listArray[i].child(0).click();//随意点击一个答案
         console.log("---------------------------");
      }
    }
     oldaquestion = aquestion;
     delay(0.5);
   }
   //delay(3.5);//后置3.5延时与前置0.5构成4s延时
 }
 


/**
 * @description: 双人对战答题 20200928增加
 * @param: null
 * @return: null
 */
function SRQuestion() {

    var f=0;
    console.log("-----------------------------------------------------------");
    console.log("开始双人对战答题");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    text("我的").click();
    while(!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while (!text("答题练习").exists());//可用词：排行榜 答题竞赛
    delay(1);
    className("android.view.View").text("答题练习").findOne().parent().child(9).click();
   // console.log("开始双人对战")
    delay(2);
    if(className("android.view.View").text("邀请对手").exists()){
    className("android.view.View").text("邀请对手").findOne().parent().child(0).click();
      }
    delay(1);
    if(className("android.view.View").text("开始对战").exists()){
    className("android.view.View").text("开始对战").findOne().click();
      }     
     delay(6);     
    let zNum = 1;//轮数
    while (true) {
      if (className("android.view.View").text("继续挑战").exists() || textContains("继续挑战").exists())//遇到继续挑战，则本局结束
        { 
            console.info("双人对战本局结束!");
            zNum++;
            if (zNum >= zCount) {
                console.log("双人对战结束！返回主页！");
                //回退4次返回主页 
                back(); delay(1);
                back(); delay(1);
                if (text("退出").exists()){
                className("android.widget.Button").text("退出").findOne().click();
                delay(1);
                }
                back(); delay(1);
                back(); delay(1);
                while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                    f++;
                    console.log("正在等待加载出主页");
                    delay(1);
                    if(f>5){
                        back();
                        var f=0;
                        break;}}
                break;
            } else {
                console.log("即将开始下一轮...")
                back();
                delay(1);
                back();
                delay(1);
                if (textContains("退出").exists()){
                className("android.widget.Button").text("退出").findOne().click();
                delay(1);
                }
                while (!text("答题练习").exists());//排行榜 答题竞赛
                delay(1);
                console.log("开始双人对战")
                delay(2);
               if(className("android.view.View").text("邀请对手").exists()){
               className("android.view.View").text("邀请对手").findOne().parent().child(0).click();
                 }
               delay(1);
               if(className("android.view.View").text("开始对战").exists()){
               className("android.view.View").text("开始对战").findOne().click();
                }     
               delay(6);     
             } 
            console.warn("开始第" + (zNum+1).toString() + "轮答题...")
        }
         while (className("RadioButton").exists()){
            delay(1);
            zsyQuestionLoop();
            delay(randomNum(1, 3));
            }
    }
}


/**
 * @description: 争上游答题 20200928增加
 * @param: null
 * @return: null
 */
function zsyQuestion() {
    var f=0;
    console.log("-----------------------------------------------------------");
    console.log("开始争上游答题");
    while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
        f++;
        console.log("正在等待加载出主页");
        delay(1);
        if(f>2){
            back();
            var f=0;}
        if((desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
           f=0;
           break;}}
    delay(1);
    text("我的").click();
    while(!textContains("我要答题").exists());
    delay(1);
    click("我要答题");
    while (!text("答题练习").exists());//可用词：排行榜 答题竞赛
    delay(1);
    className("android.view.View").text("答题练习").findOne().parent().child(8).click();
    //console.log("开始争上游答题")
    delay(2);
    if(className("android.view.View").text("开始比赛").exists()){
      className("android.view.View").text("开始比赛").findOne().click();
      }
     delay(6);     
    let zNum = 0;//轮数
    while (true) {
        if (className("android.view.View").text("继续挑战").exists() || textContains("继续挑战").exists())//遇到继续挑战，则本局结束
        {
          console.info("争上游答题本局结束!");
          zNum++;
          if (zNum >= zCount) {
            console.log("争上游答题结束，返回主页！");
                //回退4次返回主页 
                back(); delay(1);//规则说明
                back(); delay(1);//答题记录
                back(); delay(1);//我的
                back(); delay(1);//主页
                while(!(desc("学习").exists() || desc("工作").exists() || id("home_bottom_tab_button_work").exists())){
                    f++;
                    console.log("正在等待加载出主页");
                    delay(1);
                    if(f>5){
                        back();
                        var f=0;
                        break;}}
            break;
            } else {
           console.log("即将开始下一轮...")
           delay(2);//等待2秒开始下一轮
           back();
          delay(1);
           back();
          while (!text("答题练习").exists());//排行榜 答题竞赛
          delay(1);
          className("android.view.View").text("答题练习").findOne().parent().child(8).click();
          console.log("开始争上游答题")
          delay(2);
          if(className("android.view.View").text("开始比赛").exists()){
            className("android.view.View").text("开始比赛").findOne().click();
            }                
           delay(6);
         } 
        console.warn("开始第" + (zNum+1).toString() + "轮答题...")
        }
        while (className("RadioButton").exists() && !text("继续挑战").exists()){
            delay(1);
            zsyQuestionLoop();
            delay(randomNum(1, 3));
            }
    }
}   
       



