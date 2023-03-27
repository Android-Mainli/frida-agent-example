function watchObjectMethod(obj, method, isShowStackTrace = true) {
    let JavaClass = Java.use(obj.$className);
    JavaClass[method].overloads.forEach(function (overloades) {
        overloades.implementation = function () {
            let message = ">> " + method + ": " + this.$className;
            if (isShowStackTrace) {
                printJavaStackTrace(message + ":\n")
            } else {
                console.log(message);
            }
            return this[method].apply(this, arguments)
        }
    })
}

function watchClick() {
    Java.perform(function () {
        // android.view.View#setOnClickListener
        let View = Java.use("android.view.View");
        View.setOnClickListener.implementation = function (listener) {
            if (listener != null) {
                watchObjectMethod(listener, "onClick")
            }
            this.setOnClickListener(listener)
        }
        Java.choose("android.view.View$ListenerInfo", {
            onMatch: function (instance) {
                let listener = instance.mOnClickListener.value;
                if (listener != null) {
                    watchObjectMethod(listener, "onClick")
                }
            },
            onComplete: function () {
            }
        })
    })
}


function printJavaStackTrace(tag = "") {
    console.log(tag, Java.use("android.util.Log")
        .getStackTraceString(Java.use("java.lang.Throwable").$new()));
}

function watchSetTextView() {
    Java.perform(function () {
        Java.use("android.widget.TextView").setText.overload('java.lang.CharSequence', 'android.widget.TextView$BufferType', 'boolean', 'int')
            .implementation = function (text, type, notifyBefore, oldlen) {
            printJavaStackTrace(text)
            return this.setText(text, type, notifyBefore, oldlen)
        }
    })
}

function dumpClass(className) {
    Java.perform(function () {
        Java.openClassFile("/data/local/tmp/dex/dump_class.dex").load()
        const DumpClass = Java.use("com.mainli.DumpClass");
        DumpClass.pullClass(className)
    })
}


setImmediate(watchSetTextView)