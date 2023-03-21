function showClasses() {
    Java.enumerateLoadedClasses({
        onMatch: function (className) {
            if (className) {

            }
            send("found class >> " + className);		// 类名
        },
        onComplete: function () {
            send("class enumration complete");
        }
    });
}

function showClassMethods(className) {
    Java.perform(function () {
        let clazz = Java.use(className);
        let methods = clazz.class.getDeclaredMethods();
        for (var i = 0; i < methods.length; i++) {
            console.log(methods[i].getName());
        }
    });
}