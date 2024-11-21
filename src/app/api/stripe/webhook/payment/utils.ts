import fs from 'fs';
import path from 'path';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, PDFFont } from 'pdf-lib';
import { GiftCardSchema } from '@/app/(main-layout)/giftcard/utils';

export const generateGiftCardPdf = async (
  giftCardPayload: GiftCardSchema,
  expirationDate: string,
  giftCode: string,
) => {
  // Load the PDF with the template fields
  const formPdfBytes = fs.readFileSync(path.join(process.cwd(), 'public/giftcard/gift-card-with-message.pdf'));
  const pdfDoc = await PDFDocument.load(formPdfBytes);

  // Register fontkit instance with PDFDocument
  pdfDoc.registerFontkit(fontkit);

  const readFontFile = (font: string) => fs.readFileSync(path.join(process.cwd(), `public/fonts/${font}.ttf`));

  const fontRalewaySemiBold = await pdfDoc.embedFont(readFontFile('Raleway-SemiBold'));
  const fontRalewayRegular = await pdfDoc.embedFont(readFontFile('Raleway-Regular'));
  const fontRobotoBold = await pdfDoc.embedFont(readFontFile('Roboto-Bold'));

  const form = pdfDoc.getForm();

  const fieldAppearanceData = [
    [
      'title',
      fontRalewaySemiBold,
      `Cześć ${giftCardPayload.recipientName}, ${giftCardPayload.giverName} przekazuje Ci kartę podarunkową!`,
    ],
    ['message', fontRalewayRegular, giftCardPayload.message],
    ['canvasSize', fontRalewaySemiBold, `${giftCardPayload.canvasSize}x${giftCardPayload.canvasSize}cm`],
    ['expirationDate', fontRalewaySemiBold, expirationDate],
    ['giftCode', fontRobotoBold, giftCode],
  ] as const satisfies [string, PDFFont, string][];

  fieldAppearanceData.forEach(([name, font, text]) => {
    const field = form.getField(name);
    // @ts-ignore
    field.setText(text);
    // @ts-ignore
    field.updateAppearances(font);
  });

  // Flatten the form to make the fields no longer editable
  form.flatten();

  const filledPdfBytes = await pdfDoc.save();

  return filledPdfBytes;
};
