export class VideoElement {
    videoRef: any;
    isMax: boolean;
    isFullscreen: boolean;
    userId: string;
    title: string;
    constructor(videoRef: any, isMax: boolean, isFullscreen: boolean, userId: string, title: string) {
        this.videoRef = videoRef;
        this.isMax = isMax;
        this.isFullscreen = isFullscreen;
        this.userId = userId;
        this.title = title;
    }
}

export const videoDataType = new Map<string, VideoElement>();
videoDataType.set("389237982nikwebdj", new VideoElement(null, false, false, "389237982nikwebdj", "first"));
