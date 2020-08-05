export function videoElement(videoRef, isMax, userId, title) {
    this.videoRef = videoRef;
    this.isMax = isMax;
    this.userId = userId;
    this.title = title;
}

export const videoData = new Map();
videoData.set("389237982nikwebdj", new videoElement(null, false, "389237982nikwebdj", "first"));

// export const classes = [
//     {
//         mobileSize: " is-full-mobile",
//         fullMobileSize: " is-full-mobile",
//         tabletSize: " is-two-thirds-tablet",    // 0
//         desktopSize: " is-two-thirds-desktop",
//     },
//     {
//         mobileSize: " is-full-mobile",
//         fullMobileSize: " is-half-mobile",
//         tabletSize: " is-half-tablet",    // 1
//         desktopSize: " is-half-desktop",
//     },
//     {
//         mobileSize: " is-full-mobile",
//         fullMobileSize: " is-half-mobile",
//         tabletSize: " is-half-tablet",    // 2
//         desktopSize: " is-half-desktop",
//     },
//     {
//         mobileSize: " is-half-mobile",
//         fullMobileSize: " is-one-third-mobile",
//         tabletSize: " is-half-tablet",    // 3
//         desktopSize: " is-half-desktop",
//     },
//     {
//         mobileSize: " is-half-mobile",
//         fullMobileSize: " is-one-quarter-mobile",
//         tabletSize: " is-half-tablet",    // 4
//         desktopSize: " is-half-desktop",
//     },
//     {
//         mobileSize: " is-half-mobile",
//         fullMobileSize: " is-one-fifth-mobile",
//         tabletSize: " is-half-tablet",    // 5
//         desktopSize: " is-half-desktop",
//     },
// ]
