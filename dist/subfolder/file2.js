import * as f1 from '../file1';
class SubFolderClass {
    static callMyOtherMethod(s) {
        return f1.doubleWord(s);
    }
    static newMethod() {
        return 'booh';
    }
}
function notInClass(s) {
    return f1.doubleWord(s);
}
export { SubFolderClass, notInClass };
