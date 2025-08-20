import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';

export interface ColorWithOpacityOptions {
  types: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    colorWithOpacity: {
      /**
       * Set the text color with opacity support
       */
      setColorWithOpacity: (color: string) => ReturnType;
      /**
       * Unset the text color
       */
      unsetColorWithOpacity: () => ReturnType;
    };
  }
}

export const ColorWithOpacity = Extension.create<ColorWithOpacityOptions>({
  name: 'colorWithOpacity',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColorWithOpacity:
        (color: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { color }).run();
        },
      unsetColorWithOpacity:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { color: null }).removeEmptyTextStyle().run();
        },
    };
  },
});