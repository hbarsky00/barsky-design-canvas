// Utility to capture the first frame of a video as a data URL (JPEG)
// Returns null if capture fails (e.g., due to CORS)
export async function captureFirstFrame(videoUrl: string, seekToSeconds = 0.1): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const v = document.createElement('video');
      v.crossOrigin = 'anonymous';
      v.muted = true;
      (v as any).playsInline = true;
      v.preload = 'auto';
      v.src = videoUrl;

      const cleanup = () => {
        try { v.remove(); } catch {}
      };

      const onError = () => { cleanup(); resolve(null); };

      const onLoaded = () => {
        const onSeeked = () => {
          try {
            const canvas = document.createElement('canvas');
            const w = v.videoWidth || 1280;
            const h = v.videoHeight || 720;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (!ctx) { cleanup(); resolve(null); return; }
            ctx.drawImage(v, 0, 0, w, h);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            cleanup();
            resolve(dataUrl);
          } catch {
            cleanup();
            resolve(null);
          }
        };

        // Try to seek a bit into the video to avoid black frames
        try {
          v.currentTime = Math.max(seekToSeconds, 0.05);
        } catch {
          // Fallback if seeking fails
          onSeeked();
        }

        v.addEventListener('seeked', onSeeked, { once: true });
      };

      v.addEventListener('error', onError, { once: true });
      v.addEventListener('loadeddata', onLoaded, { once: true });

      // Some browsers require the element to be in the DOM to load
      document.body.appendChild(v);
    } catch {
      resolve(null);
    }
  });
}
