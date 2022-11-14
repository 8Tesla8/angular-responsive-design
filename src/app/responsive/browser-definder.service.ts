export enum BrowserType{
    Opera = "Opera",
    Firefox = "Firefox",
    InternetExplorer = "Internet Explorer",
    Edge = "Microsoft Edge",
    Chrome = "Google Chrome or Chromium",
    Safari = "Safari",
    Unknown = "unknown"
}


export class BrowserDefinderService {

    private _currentBrowser : BrowserType = BrowserType.Unknown;

    public get currentBrowser() : BrowserType {
        return this._currentBrowser;
    }

    constructor() {
        this.defineBrowser();
    }

    public defineBrowser(): BrowserType {
        let browserType = BrowserType.Unknown;
        let userAgent = navigator.userAgent;

        // The order matters here, and this may report false positives for unlisted browsers.

        if (userAgent.indexOf(BrowserType.Firefox) > -1) {
            browserType = BrowserType.Firefox; // "Mozilla Firefox";
            // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
        } 
        else if (userAgent.indexOf(BrowserType.Opera) > -1 || userAgent.indexOf("OPR") > -1) {
            browserType = BrowserType.Opera; 
            //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
        } 
        else if (userAgent.indexOf("Trident") > -1) {
            browserType = BrowserType.InternetExplorer; // "Microsoft Internet Explorer";
            // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
        } 
        else if (userAgent.indexOf("Edge") > -1) {
            browserType = BrowserType.Edge; // "Microsoft Edge";
            // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
        } 
        else if (userAgent.indexOf("Chrome") > -1) {
            browserType = BrowserType.Chrome; // "Google Chrome or Chromium";
            // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
        } 
        else if (userAgent.indexOf(BrowserType.Safari) > -1) {
            browserType = BrowserType.Safari; // "Apple Safari"
            // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
        }

        this._currentBrowser = browserType;

        return browserType;
    }

}