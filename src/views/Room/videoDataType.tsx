export class VideoElement {
    videoRef: any;
    audioRef: any;
    userId: string;
    displayName: string;
    constructor(videoRef: any, audioRef: any, userId: string, displayName: string) {
        this.videoRef = videoRef;
        this.audioRef = audioRef;
        this.userId = userId;
        this.displayName = displayName;
    }
}

export const videoDataType = new Map<string, VideoElement>();


