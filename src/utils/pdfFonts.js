import { Font } from '@react-pdf/renderer';
import SarabunRegular from '@fontsource/sarabun/files/sarabun-thai-400-normal.woff';
import SarabunItalic from '@fontsource/sarabun/files/sarabun-thai-400-italic.woff';
import SarabunBold from '@fontsource/sarabun/files/sarabun-thai-700-normal.woff';
import AnuphanRegular from '../assets/fonts/Anuphan-Regular.ttf';
import AnuphanBold from '../assets/fonts/Anuphan-Bold.ttf';

Font.register({ family: 'Sarabun', src: SarabunRegular, fontWeight: 400 });
Font.register({ family: 'Sarabun', src: SarabunItalic, fontWeight: 400, fontStyle: 'italic' });
Font.register({ family: 'Sarabun', src: SarabunBold, fontWeight: 700 });
Font.register({ family: 'SarabunBold', src: SarabunBold });
Font.register({ family: 'Anuphan', src: AnuphanRegular, fontWeight: 400 });
Font.register({ family: 'AnuphanBold', src: AnuphanBold });

export const getPdfFonts = (language) => ({
  regular: 'Anuphan',
  bold: 'AnuphanBold',
  isThai: language === 'th',
});
