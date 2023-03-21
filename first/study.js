function main() {
    Java.perform(function () {
        let mainActivity = Java.use("com.baidu.duer.sound.detection.MainActivity");
        let staticPublic = mainActivity.staticPublic("frida 传入1123");
        console.log('返回值' + staticPublic);
    })
}

function start() {
    Java.perform(function () {
        Java.choose("com.baidu.duer.sound.detection.MainActivity", {
            onMatch: function (instance) {
                instance.start();
            },
            onComplete: function () {
                console.log("choose 完成");
            }
        })
    })
}

function stop() {
    Java.perform(function () {
        Java.choose("com.baidu.duer.sound.detection.MainActivity", {
            onMatch: function (instance) {
                let use = Java.use("com.baidu.duer.sound.detection.DetectionService");
                use.stop(instance, instance.conn.value)
                instance.conn.value = null
            },
            onComplete: function () {
                console.log("choose 完成");
            }
        })
    })
}
function setText() {
    Java.perform(function () {
        Java.choose("com.baidu.duer.sound.detection.databinding.ActivityMainBinding", {
            onMatch: function (instance) {
                // console.log(instance.moniterText.value.getText());
                Java.scheduleOnMainThread(function (){
                    let StringClass = Java.use("java.lang.String");
                    // console.log(instance.moniterText.value.$className);
                    instance.moniterText.value.setText(StringClass.$new("你被hook了,我已经修改了你"))
                })
            },
            onComplete: function () {
                console.log("choose 完成");
            }
        })
    })
}
function getText() {
    Java.perform(function () {
        // Java.enumerateLoadedClasses({
        //     onMatch: function(className){
        //         send("found class >> " + className);
        //     },
        //     onComplete: function(){
        //         send("class enumration complete");
        //     }
        // });
        Java.choose("androidx.appcompat.widget.AppCompatButton", {
            onMatch: function (instance) {
                console.log(instance.getText());
            },
            onComplete: function () {
                console.log("choose 完成");
            }
        })
    })
}
