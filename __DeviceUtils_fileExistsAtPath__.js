{
    onEnter: function (log, args, state) {

        var jailbreakPaths = [
            "/etc/apt",
            "/Library/MobileSubstrate/MobileSubstrate.dylib",
            "/Applications/Cydia.app",
            "/Applications/blackra1n.app",
            "/Applications/FakeCarrier.app",
            "/Applications/Icy.app",
            "/Applications/IntelliScreen.app",
            "/Applications/MxTube.app",
            "/Applications/RockApp.app",
            "/Applications/SBSetttings.app",
            "/Applications/WinterBoard.app",
            "/usr/sbin/sshd",
            "/private/var/tmp/cydia.log",
            "/usr/binsshd",
            "/usr/libexec/sftp-server",
            "/Systetem/Library/LaunchDaemons/com.ikey.bbot.plist",
            "/System/Library/LaunchDaemons/com.saurik.Cy@dia.Startup.plist",
            "/Library/MobileSubstrate/MobileSubstrate.dylib",
            "/var/log/syslog",
            "/bin/bash",
            "/bin/sh",
            "/etc/ssh/sshd_config",
            "/usr/libexec/ssh-keysign",
            "/usr/libexec/cydia/",
            "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
            "/var/lib/cydia/",
        ];

        var  path = ObjC.Object(args[2]).toString(); // NSString
        log("-[DeviceUtils fileExistsAtPath:" + path +"]");

        this.jailbreakCall = false;
        var i = jailbreakPaths.length;
        if (path.indexOf("/private") >= 0) {
                log("Jailbreak detection => Trying to read path: "+path);
                this.jailbreakCall = true;
        } else {
            while (i--) {
                if (jailbreakPaths[i] == path) {
                    log("Jailbreak detection => Trying to read path: "+path);
                    this.jailbreakCall = true;
                }
            }
        }
    },
    onLeave: function (log, retval, state) {
        if(this.jailbreakCall) {
            retval.replace(0x0)
            log("Jailbreak detection => Bypassed")
        }
    }
}