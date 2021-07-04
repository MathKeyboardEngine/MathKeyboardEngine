import * as f1 from '../file1';

class SubFolderClass{
    static callMyOtherMethod(s:string) : string { 
        return f1.doubleWord(s);
    }

    static newMethod() : string {
        return 'booh';
    }
}

function notInClass(s:string) : string { 
    return f1.doubleWord(s);
}

export { SubFolderClass, notInClass}