/*
 * Auto-generated by Frida. Please modify to match the signature of -[NSFileManager removeItemAtPath:error:].
 * This stub is currently auto-generated from manpages when available.
 *
 * For full API reference, see: http://www.frida.re/docs/javascript-api/
 */

{
    /**
     * Called synchronously when about to call -[NSFileManager removeItemAtPath:error:].
     *
     * @this {object} - Object allowing you to store state for use in onLeave.
     * @param {function} log - Call this function with a string to be presented to the user.
     * @param {array} args - Function arguments represented as an array of NativePointer objects.
     * For example use Memory.readUtf8String(args[0]) if the first argument is a pointer to a C string encoded as UTF-8.
     * It is also possible to modify arguments by assigning a NativePointer object to an element of this array.
     * @param {object} state - Object allowing you to keep state across function calls.
     * Only one JavaScript function will execute at a time, so do not worry about race-conditions.
     * However, do not use this to store function arguments across onEnter/onLeave, but instead
     * use "this" which is an object for keeping state local to an invocation.
     */
    onEnter: function (log, args, state) {
        var path = ObjC.Object(args[3]).toString(); // NSString
        log("-[NSFileManager removeItemAtPath:" + path + " error:" + args[3] + " ]");
        
        if (path.indexOf("private") >= 0) {
            log("Jailbreak detection => Trying to remove path: "+path);
            this.jailbreakCall = true;
            this.error = args[3];
        }
    },

    /**
     * Called synchronously when about to return from -[NSFileManager removeItemAtPath:error:].
     *
     * See onEnter for details.
     *
     * @this {object} - Object allowing you to access state stored in onEnter.
     * @param {function} log - Call this function with a string to be presented to the user.
     * @param {NativePointer} retval - Return value represented as a NativePointer object.
     * @param {object} state - Object allowing you to keep state across function calls.
     */
    onLeave: function (log, retval, state) {
        if(this.jailbreakCall) {
            var error = ObjC.classes.NSError.alloc();
            Memory.writePointer(this.error, error);
            log("Jailbreak detection bypassed!");
        }
    }
}
