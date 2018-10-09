{
    onEnter: function (log, args, state) {

        var jailbreakPaths = [
            "/Applications/Cydia.app",
            "/Applications/blackra1n.app",
            "/Applications/FakeCarrier.app",
            "/Applications/Icy.app",
            "/Applications/IntelliScreen.app",
            "/Applications/MxTube.app",
            "/Applications/RockApp.app",
            "/Applications/SBSetttings.app",
            "/Applications/WinterBoard.app",
            "/Systetem/Library/LaunchDaemons/com.ikey.bbot.plist",
            "/System/Library/LaunchDaemons/com.saurik.Cy@dia.Startup.plist",
            "/Library/MobileSubstrate/MobileSubstrate.dylib",
            "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
        ];
        var path = Memory.readCString(args[0])
        var mode = Memory.readCString(args[1])

        log("fopen(" + path + "," + mode + ")");

        this.jailbreakCall = false;
        var i = jailbreakPaths.length;
        if (path.indexOf("/private") >= 0 || path.indexOf("/usr") >= 0  
            || path.indexOf("/etc") >= 0  || path.indexOf("/var") >= 0
            || path.indexOf("/bin") >= 0  ) {
                log("Jailbreak detection => Trying to open file: "+path);
                this.jailbreakCall = true;
        } else {
            while (i--) {
                if (jailbreakPaths[i] == path) {
                    log("Jailbreak detection => Trying to open file: "+path);
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