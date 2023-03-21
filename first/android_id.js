function main() {
    console.log("脚本attach成功");
    Java.perform(function () {
        console.log("java attach 成功");
        let use = Java.use('');
    })
}