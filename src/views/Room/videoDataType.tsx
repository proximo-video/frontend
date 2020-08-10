export class VideoElement {
    videoRef: any;
    userId: string;
    displayName: string;
    constructor(videoRef: any, userId: string, displayName: string) {
        this.videoRef = videoRef;
        this.userId = userId;
        this.displayName = displayName;
    }
}

export const videoDataType = new Map<string, VideoElement>();


