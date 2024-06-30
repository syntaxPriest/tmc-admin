export function getCdnLink (url: string | undefined, type: "event" | "inventory" | "dp", isAvatar?: boolean, ){
    if (!url) {
      return null
    }

    let baseUrl = ""
    switch (type) {
        case "event":
            baseUrl =  process.env.REACT_APP_EVENT_IMAGE_CDN_URL || "https://d2jbgm8i49gmb2.cloudfront.net"
            break;
        case "dp":
            baseUrl =  "https://d3u7yb1x43c2gx.cloudfront.net"
            break;
        case "inventory":
            baseUrl = "https://d1adgjnww1agdn.cloudfront.net";
            break;
        default:
            break;
    }
    
    const avatarBaseUrl = process.env.NEXT_PUBLIC_AVATAR_IMAGE_CDN_URL

    const fileName = url.split('/').at(-1)
    const link = `${isAvatar ? avatarBaseUrl : baseUrl}/${fileName}`;
    return link;
}