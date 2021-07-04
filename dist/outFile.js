define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.doubleWord = void 0;
    function doubleWord(argu) {
        return argu + ' ' + argu;
    }
    exports.doubleWord = doubleWord;
});
define("subfolder/file2", ["require", "exports", "file1"], function (require, exports, f1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.notInClass = exports.SubFolderClass = void 0;
    class SubFolderClass {
        static callMyOtherMethod(s) {
            return f1.doubleWord(s);
        }
        static newMethod() {
            return 'booh';
        }
    }
    exports.SubFolderClass = SubFolderClass;
    function notInClass(s) {
        return f1.doubleWord(s);
    }
    exports.notInClass = notInClass;
});
