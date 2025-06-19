
export class DOMUpdater {
  static applyAllChangesToDOM(
    imageReplacements: Record<string, string>,
    textContent: Record<string, string>,
    contentBlocks: Record<string, any[]>,
    originalPath: string
  ) {
    console.log('🎨 Applying ALL published changes to DOM immediately and comprehensively');

    // Apply ALL image changes with cache busting and immediate DOM updates
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      const timestamp = Date.now();
      const cacheBustedNewSrc = newSrc.includes('?') 
        ? `${newSrc}&v=${timestamp}` 
        : `${newSrc}?v=${timestamp}`;
      
      console.log('🖼️ Updating ALL images in DOM for:', oldSrc.substring(0, 30) + '...', '->', cacheBustedNewSrc.substring(0, 30) + '...');
      
      // Update ALL matching images immediately with multiple selection strategies
      const selectors = [
        `img[src="${oldSrc}"]`,
        `img[src*="${oldSrc.substring(0, 50)}"]`,
        `img[data-original-src="${oldSrc}"]`
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((img) => {
          console.log('📸 Updating specific image element:', selector);
          (img as HTMLImageElement).src = cacheBustedNewSrc;
          img.setAttribute('data-updated', 'true');
          (img as HTMLElement).style.opacity = '0';
          (img as HTMLImageElement).onload = () => {
            (img as HTMLElement).style.opacity = '1';
          };
        });
      });
      
      // Also update any img elements that might have partial matches
      document.querySelectorAll('img').forEach((img) => {
        const imgSrc = img.src || img.getAttribute('src') || '';
        if (imgSrc.includes(oldSrc.substring(oldSrc.lastIndexOf('/') + 1)) || 
            imgSrc === oldSrc ||
            img.getAttribute('data-original-src') === oldSrc) {
          console.log('🔄 Updating image by partial match:', imgSrc);
          img.src = cacheBustedNewSrc;
          img.setAttribute('data-updated', 'true');
          img.style.opacity = '0';
          img.onload = () => {
            img.style.opacity = '1';
          };
        }
      });
      
      // Update background images
      document.querySelectorAll('[style*="background-image"]').forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && (style.backgroundImage.includes(oldSrc) || style.backgroundImage.includes(oldSrc.substring(0, 30)))) {
          console.log('🎨 Updating background image:', style.backgroundImage);
          style.backgroundImage = style.backgroundImage.replace(/url\(['"]?[^'"]*['"]?\)/, `url("${cacheBustedNewSrc}")`);
        }
      });
    });

    // Apply ALL text content changes immediately with comprehensive selection
    Object.entries(textContent).forEach(([key, value]) => {
      console.log('📝 Updating ALL text in DOM for key:', key, 'with value:', value.substring(0, 50) + '...');
      
      // Multiple selection strategies for text elements
      const selectors = [
        `[data-text-key="${key}"]`,
        `[data-editable-text="${key}"]`,
        `[data-content-key="${key}"]`
      ];
      
      let elementsFound = 0;
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          if (element.textContent !== value) {
            console.log('📄 Updating text element:', selector, element.textContent?.substring(0, 30), '->', value.substring(0, 30));
            element.textContent = value;
            element.setAttribute('data-updated', 'true');
            elementsFound++;
          }
        });
      });
      
      if (elementsFound === 0) {
        console.warn('⚠️ No text elements found for key:', key);
      }
    });

    // Apply content block changes
    Object.entries(contentBlocks).forEach(([sectionKey, blocks]) => {
      console.log('📦 Updating content blocks for section:', sectionKey, 'with', blocks.length, 'blocks');
      
      const sectionElements = document.querySelectorAll(`[data-section="${sectionKey}"]`);
      sectionElements.forEach((element) => {
        element.setAttribute('data-updated', 'true');
        console.log('📦 Marked content block section for update:', sectionKey);
      });
    });

    // Force re-render of all React components by dispatching a comprehensive refresh event
    setTimeout(() => {
      console.log('🔄 Triggering comprehensive component refresh after DOM updates');
      window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
        detail: { 
          allUpdated: true,
          timestamp: Date.now(),
          imageCount: Object.keys(imageReplacements).length,
          textCount: Object.keys(textContent).length
        }
      }));
    }, 100);

    console.log('✅ ALL published changes applied to DOM comprehensively - staying on page:', originalPath);
  }
}
