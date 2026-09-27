import { Font } from '@react-pdf/renderer';
import SarabunRegular from '@fontsource/sarabun/files/sarabun-thai-400-normal.woff';
import SarabunBold from '@fontsource/sarabun/files/sarabun-thai-700-normal.woff';

Font.register({ family: 'Sarabun', src: SarabunRegular, fontWeight: 400 });
Font.register({ family: 'Sarabun', src: SarabunBold, fontWeight: 700 });
Font.register({ family: 'SarabunBold', src: SarabunBold });

export const getPdfFonts = (language) => language === 'th'
  ? { regular: 'Sarabun', bold: 'SarabunBold' }
  : { regular: 'Helvetica', bold: 'Helvetica-Bold' };
