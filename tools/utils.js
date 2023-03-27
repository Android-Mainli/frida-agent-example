/**
 * 输出java函数调用堆栈
 */
function printJavaStackTrace(tag = "") {
    //java打印堆栈
    console.log(tag, Java.use("android.util.Log")
        .getStackTraceString(Java.use("java.lang.Throwable").$new()));
}

/**
 * 输出Native函数调用堆栈
 */
export function printNativeStackTrace(tag = "") {
    console.log(tag, ' called from:\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');//SO打印堆栈
}


export function getObjectClassName() {

}

/**
 * 显示所有class
 */
export function showClasses() {
    Java.enumerateLoadedClasses({
        onMatch: function (className) {
            send("found class >> " + className);		// 类名
        },
        onComplete: function () {
            send("class enumration complete");
        }
    });
}

function watchObjectMethod(obj, method, isShowStackTrace = false) {
    let JavaClass = Java.use(obj.$className);
    JavaClass[method].overloads.forEach(function (overloades) {
        overloades.implementation = function () {
            let message = "==> " + method + ": " + this.$className;
            if (isShowStackTrace) {
                printJavaStackTrace(message + " 堆栈如下:\n")
            } else {
                console.log(message);
            }
            return this[method].apply(this, arguments)
        }
    })
}