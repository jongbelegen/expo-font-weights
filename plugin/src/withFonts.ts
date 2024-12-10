import { ConfigPlugin, createRunOncePlugin } from 'expo/config-plugins';

import { withFontsAndroid } from './withFontsAndroid';
import { withFontsIos } from './withFontsIos';

const pkg = require('expo-font/package.json');

export type FontObject = {
  path: string;
  family: string;
  weight: number;
  style?: 'normal' | 'italic';
};

export type Font = string | FontObject;

export type FontProps = {
  fonts?: Font[];
};

const withFonts: ConfigPlugin<FontProps> = (config, props) => {
  if (!props) {
    return config;
  }

  if (props.fonts && props.fonts.length === 0) {
    return config;
  }

  if (props.fonts.some((font) => font.family.includes(" "))) {
    throw new Error(
      "Font family names must not contain any spaces. Please remove spaces from the font family names in your configuration."
    );
  }

  config = withFontsIos(config, props.fonts ?? []);
  config = withFontsAndroid(config, props.fonts ?? []);

  return config;
};

export default createRunOncePlugin(withFonts, pkg.name, pkg.version);
