interface Umami {
    track(event: string): void;
    // Add other methods if umami has more that you're using.
}

interface Window {
    umami: Umami;
}
