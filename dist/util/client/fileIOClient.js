"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileIOClient = void 0;
const fs_1 = require("fs");
class FileIOClient {
    readFile(filepath, functionName) {
        try {
            return (0, fs_1.readFileSync)(filepath, 'utf-8');
        }
        catch (error) {
            this.postError(functionName, 'readFileSync', filepath);
            throw error;
        }
    }
    writeFile(filepath, content, functionName) {
        try {
            (0, fs_1.writeFileSync)(filepath, content);
        }
        catch (error) {
            this.postError(functionName, 'writeFileSync', filepath);
            throw error;
        }
    }
    appendToFile(filepath, content, functionName) {
        try {
            (0, fs_1.appendFileSync)(filepath, content);
        }
        catch (error) {
            this.postError(functionName, 'appendFileSync', filepath);
            throw error;
        }
    }
    deleteFile(filepath, functionName) {
        try {
            const callback = () => { };
            (0, fs_1.unlink)(filepath, callback);
        }
        catch (error) {
            this.postError(functionName, 'deleteFile', filepath.toString());
            throw error;
        }
    }
    copyFile(srcFilepath, dstFilepath, functionName) {
        try {
            const copiedSrcFile = this.readFile(srcFilepath, functionName);
            this.writeFile(dstFilepath, copiedSrcFile, functionName);
        }
        catch (error) {
            this.postError(functionName, 'copyFile', dstFilepath);
            throw error;
        }
    }
    moveFile(srcFilepath, dstFilepath, functionName) {
        try {
            this.copyFile(srcFilepath, dstFilepath, functionName);
            this.deleteFile(srcFilepath, functionName);
        }
        catch (error) {
            this.postError(functionName, 'moveFile', dstFilepath);
            throw error;
        }
    }
    removeDirectory(dirpath, functionName) {
        try {
            return (0, fs_1.rmdirSync)(dirpath);
        }
        catch (error) {
            this.postError(functionName, 'rmdirSync', dirpath);
            throw error;
        }
    }
    fileExists(filepath, functionName) {
        try {
            return (0, fs_1.existsSync)(filepath);
        }
        catch (error) {
            this.postError(functionName, 'existsSync', filepath);
            throw error;
        }
    }
    postError(functionName, actionName, filepath) {
        console.log(`⛔️ ${functionName}(): Failed to ${actionName} for ${filepath}.`);
    }
}
exports.FileIOClient = FileIOClient;
