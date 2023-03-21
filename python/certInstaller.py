import frida


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

try:
    device = frida.get_usb_device()
    process = device.attach('com.android.certinstaller')
    script = process.create_script('''
        function certInstaller() {
            Java.perform(function () {
                let use = Java.use("com.android.certinstaller.CredentialHelper");
                use.hasOnlyVpnAndAppsTrustAnchors.implementation = function () {
                    console.log("hasOnlyVpnAndAppsTrustAnchors 被调用返回false 绕过证书安装");
                    return false;
                }
            })
        }
        rpc.exports={
            //key 不可有大写 python那边调用会全部转化为小写
            'certinstaller':certInstaller,
        };
    ''')
    script.on('message', on_message)
    script.load()

    print("已经hook完毕,可以愉快的安装证书了")
    certinstaller = script.exports_sync.certInstaller()
    input("\n按回车退出hook\n")
except frida.InvalidArgumentError as e:
    print("请插入手机后再试", e)
except frida.ServerNotRunningError as e:
    print("无法连接frida服务,请在手机上运行frida服务", e)
