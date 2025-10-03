// utils/circleImage.ts
export async function toCircularDataUrl(
  src: string,
  size = 256,
  borderColor?: string,
  borderWidth = 0,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Same-origin imported assets are fine. For external URLs you need CORS.
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, size, size);

      // Clip circle
      ctx.save();
      const radius = size / 2 - borderWidth;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw image "cover"
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(size / iw, size / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const dx = (size - nw) / 2;
      const dy = (size - nh) / 2;
      ctx.drawImage(img, dx, dy, nw, nh);
      ctx.restore();

      // Optional border
      if (borderWidth > 0) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        ctx.lineWidth = borderWidth * 2; // visual thickness
        ctx.strokeStyle = borderColor || '#fff';
        ctx.stroke();
      }

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = src;
  });
}
