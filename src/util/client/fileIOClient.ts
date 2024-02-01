import { appendFileSync, existsSync, NoParamCallback, PathLike, readFileSync, rmdirSync, unlink, writeFileSync } from 'fs';

export class FileIOClient {

    public readFile(
        filepath: string,
        functionName: string
    ): string {
        try {
            return readFileSync(filepath, 'utf-8');
        } catch (error: any) {
            this.postError(functionName, 'readFileSync', filepath);
            throw error;
        }
    }

    public writeFile(
        filepath: string,
        content: string,
        functionName: string
    ): void {
        try {
            writeFileSync(filepath, content);
        } catch (error: any) {
            this.postError(functionName, 'writeFileSync', filepath);
            throw error;
        }
    }

    public appendToFile(
        filepath: string,
        content: string,
        functionName: string
    ): void {
        try {
            appendFileSync(filepath, content);
        } catch (error: any) {
            this.postError(functionName, 'appendFileSync', filepath);
            throw error;
        }
    }

    public deleteFile(
        filepath: PathLike,
        functionName: string
    ): void {
        try {
            const callback: NoParamCallback = () => {};
            unlink(filepath, callback);
        } catch (error: any) {
            this.postError(functionName, 'deleteFile', filepath.toString());
            throw error;
        }
    }

    public copyFile(
        srcFilepath: string,
        dstFilepath: string,
        functionName: string
    ): void {
        try {
            const copiedSrcFile: string = this.readFile(srcFilepath, functionName);
            this.writeFile(dstFilepath, copiedSrcFile, functionName);
        } catch (error: any) {
            this.postError(functionName, 'copyFile', dstFilepath);
            throw error;
        }
    }

    public moveFile(
        srcFilepath: string,
        dstFilepath: string,
        functionName: string
    ): void {
        try {
            this.copyFile(srcFilepath, dstFilepath, functionName);
            this.deleteFile(srcFilepath, functionName);
        } catch (error: any) {
            this.postError(functionName, 'moveFile', dstFilepath);
            throw error;
        }
    }

    public removeDirectory(
        dirpath: string,
        functionName: string
    ) {
        try {
            return rmdirSync(dirpath);
        } catch (error: any) {
            this.postError(functionName, 'rmdirSync', dirpath);
            throw error;
        }
    }

    public fileExists(
        filepath: string,
        functionName: string
    ): boolean {
        try {
            return existsSync(filepath);
        } catch (error: any) {
            this.postError(functionName, 'existsSync', filepath);
            throw error;
        }
    }

    public postError(
        functionName: string,
        actionName: string,
        filepath: string
    ) {
        console.log(
            `⛔️ ${functionName}(): Failed to ${actionName} for ${filepath}.`
        );
    }
}
