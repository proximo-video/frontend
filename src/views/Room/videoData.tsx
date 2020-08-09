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

export const videoData = new Map<string, VideoElement>();

