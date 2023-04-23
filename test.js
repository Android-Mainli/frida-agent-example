function test() {
    Java.perform(function () {
        let System = Java.use("java.lang.System");
        System.currentTimeMillis.implementation = function () {
            return this.currentTimeMillis() + 2592000000;
        }
    })
}
setImmediate(test)