import Logger from "./logger";
import HTTP_STATUS_CODE from "./httpStatusCode";

function getFilenameExtension(filename: string): string {
    // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export { Logger, HTTP_STATUS_CODE, getFilenameExtension };