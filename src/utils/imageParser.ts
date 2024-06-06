export function getCdnLink (url: string | undefined, type: "event", isAvatar?: boolean, ){
    if (!url) {
      return null
    }

    let baseUrl = ""
    switch (type) {
        case "event":
            baseUrl =  process.env.REACT_APP_EVENT_IMAGE_CDN_URL || ""
            break;
        default:
            break;
    }
    const avatarBaseUrl = process.env.NEXT_PUBLIC_AVATAR_IMAGE_CDN_URL

    const fileName = url.split('/').at(-1)
    const link = `${isAvatar ? avatarBaseUrl : baseUrl}/${fileName}`;
    return link;
}