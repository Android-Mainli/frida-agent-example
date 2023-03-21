/**
 * 用户hook系统证书安装应用(com.android.certinstaller)确保HttpCanary可以顺利安装证书
 * 脚本编写可参考:https://github.com/liyansong2018/FridaHookAndroid
 * 参考:https://blog.csdn.net/weixin_56039202/article/details/125794003编写 感谢"马到成功~"
 * android-13.0.0_r3源码在/packages/apps/CertInstaller/src/com/android/certinstaller/CredentialHelper.java中
 * 如果这个证书用于应用和VPN则返回true，因此只要hook它让其永远返回false就绕过了CA证书安装的限制，
 * Returns true if this credential contains _only_ CA certificates to be used as trust anchors
 * for VPN and apps.
 public boolean hasOnlyVpnAndAppsTrustAnchors() {
    if (!hasCaCerts()) {
        return false;
    }
    if (mUid != UID_SELF) {
        // VPN and Apps trust anchors can only be installed under UID_SELF
        return false;
    }

    if (mUserKey != null) {
        // We are installing a key pair for client authentication, its CA
        // should have nothing to do with VPN and apps trust anchors.
        return false;
    } else {
        return true;
    }
}
 */
function certInstaller() {
    Java.perform(function () {
        let use = Java.use("com.android.certinstaller.CredentialHelper");
        use.hasOnlyVpnAndAppsTrustAnchors.implementation = function () {
            console.log("hasOnlyVpnAndAppsTrustAnchors 被调用返回false 绕过证书安装");
            return false;
        }
    })
}

setImmediate(certInstaller)
