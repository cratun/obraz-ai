'use client';

import { useRef, useState, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { ParsedGenerationTokenCookie } from '@/app/(main-layout)/generate/_utils/generation-token';
import { ImageHistoryEntry } from '@/app/(main-layout)/generate/_utils/image-history/common';
import { actionUploadImage } from '@/app/(main-layout)/generate/portrait/buy/action-generate-portrait';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import BenefitsSection from '@/app/_components/benefits-section';
import Typography from '@/app/_components/typography';
import { SpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import ErrorIcon from './error-icon';
import GenerateInfoLimit from './generation-token-limit-info';
import ImageHistory from './image-history';
import TemplateModal from './template-modal';

const MAX_FILE_SIZE_IN_BYTES = 1000 * 1000 * 50; // 50 MB
export const ALLOWED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'].join(', ');
const ERROR_CODES = ['file-invalid-type', 'file-too-large'] as const;
const ERROR_MESSAGES = {
  'file-invalid-type': 'Nieprawidłowy format pliku',
  'file-too-large': 'Plik jest za duży',
};

const isAllowedErrorCode = (code: string): code is (typeof ERROR_CODES)[number] => ERROR_CODES.includes(code);
type FileState = { url: string | null; file: File | null };

const PageGeneratePortraitContent = ({
  generationTokenCountCookie,
  imageHistory,
  specialPromoCookie,
}: {
  generationTokenCountCookie: ParsedGenerationTokenCookie;
  imageHistory: ImageHistoryEntry[];
  specialPromoCookie: SpecialPromoCookie;
}) => {
  const router = useRouter();
  const templateRef = useRef<HTMLDivElement | null>(null);
  const [fileInputErrors, setFileInputErrors] = useState<string[]>([]);
  const [file, setFile] = useState<FileState>({ url: null, file: null });
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const uploadImageMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return actionUploadImage(formData);
    },
    onSuccess: (url) => {
      startTransition(() => {
        router.replace(`/generate/portrait/buy?image=${url}&template=${templateUrl}`);
      });
    },
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, rootRef } = useDropzone({
    maxSize: MAX_FILE_SIZE_IN_BYTES,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic'],
      'image/heif': ['.heif'],
    },
    onDropAccepted: async ([acceptedFile]) => {
      const fileUrl = URL.createObjectURL(acceptedFile);
      setFile({ url: fileUrl, file: acceptedFile });
    },
    onDrop: () => setFileInputErrors([]),
    onDropRejected: ([rejectedFile]) => {
      const errorMessages = rejectedFile.errors
        .map((error) => (isAllowedErrorCode(error.code) ? ERROR_MESSAGES[error.code] : null))
        .filter(Boolean);
      setFileInputErrors(errorMessages);
    },
  });

  const handleSubmit = ({ file, templateUrl }: { file: FileState; templateUrl: string | null }) => {
    if (!file.file) {
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      return;
    }

    if (!templateUrl) {
      templateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      return;
    }

    uploadImageMutation.mutate(file.file);
  };

  const shouldLoad = uploadImageMutation.isPending || isPending;

  return (
    <>
      <AppContainer className="pb-20 pt-[--save-navbar-padding-top]">
        <AppContainer.Content className="flex flex-col gap-10 overflow-auto text-text lg:gap-20">
          <div className="flex flex-col gap-5 lg:gap-10">
            <div className="flex flex-col gap-2.5 lg:gap-5">
              <div className="flex flex-col items-center gap-2.5 md:flex-row">
                <h1 className="text-3xl font-bold leading-[120%] tracking-[1px] md:text-4xl lg:text-5xl">
                  Stwórz <span className="text-primary">swój</span> portret<span className="text-primary">.</span>
                </h1>
                <span>lub</span>
                <AppButton href="/generate" LinkComponent={Link} variant="outlined">
                  Stwórz obraz
                </AppButton>
              </div>
              <p className="leading-[150%] tracking-[0.5px]">
                Wybierz zdjęcie, które powinno zawierać twarz. Zostanie następnie zintegrowane z wybranym szablonem.
              </p>
              <div className="grid grid-cols-3 gap-5 md:grid-cols-6">
                {(['0', '1', '2'] as const).map((index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      alt=""
                      className="aspect-square w-full rounded-xl object-contain"
                      height={200}
                      src={`/portrait-examples/correct-${Number(index) + 1}.png`}
                      width={200}
                    />
                    <CheckRoundedIcon className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-md bg-white fill-primary md:h-10 md:w-10 md:rounded-tl-xl" />
                  </div>
                ))}
                {(['0', '1', '2'] as const).map((index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      alt=""
                      className="aspect-square w-full rounded-xl object-contain"
                      height={200}
                      src={`/portrait-examples/wrong-${Number(index) + 1}.png`}
                      width={200}
                    />
                    <ClearRoundedIcon className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-md bg-white fill-accent md:h-10 md:w-10 md:rounded-tl-xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <GenerateInfoLimit generationTokenCountCookie={generationTokenCountCookie} />
            <ul className="flex list-inside list-disc flex-col gap-2 text-xs leading-[1.5] tracking-[0.5px] text-text">
              <li>
                Upewnij się, że przesyłane zdjęcia mają <strong>wysoką jakość</strong>.
              </li>
              <li>
                Zdjęcie powinno zawierać twarz <strong>tylko jednej osoby</strong>.
              </li>
              <li>
                Twarz powinna być dobrze widoczna. <strong>Zbyt przybliżona twarz</strong> może spowodować, że nie
                będzie można jej poprawnie rozpoznać.
              </li>
              <li>
                Na zdjęciu nie powinieneś nosić: <strong>nakryć głowy</strong>, <strong>nakryć twarzy</strong>.
              </li>
              <li>
                Dla zdjęć w formacie <strong>HEIC/HEIF</strong> nie ma podglądu.
              </li>
            </ul>
            <div
              {...getRootProps({
                className: twMerge(
                  'flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-text/50 bg-shark dropzone gap-2.5 text-sm transition-colors p-2',
                  isFocused && 'border-text',
                  isDragAccept && 'border-primary',
                  isDragReject && 'border-accent',
                ),
              })}
            >
              <input {...getInputProps()} />
              {file.url ? (
                <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
                  {file.file?.type === 'image/heic' || file.file?.type === 'image/heif' ? (
                    <Typography.Body className="m-auto">Zdjęcie w formacie HEIC/HEIF nie ma podglądu.</Typography.Body>
                  ) : (
                    <Image fill alt="" className="object-contain" src={file.url} />
                  )}
                </div>
              ) : (
                <>
                  <CloudUploadIcon
                    fontSize="large"
                    className={twMerge(
                      'fill-text/50',
                      isFocused && 'fill-text',
                      isDragAccept && 'fill-primary',
                      isDragReject && 'fill-accent',
                    )}
                  />
                  <span
                    className={twMerge(
                      'text-center text-text',
                      isFocused && 'text-text',
                      isDragAccept && 'text-primary',
                      isDragReject && 'text-accent',
                    )}
                  >
                    <span>Przeciągnij i upuść zdjęcie lub kliknij aby wybrać zdjęcie</span>
                  </span>
                </>
              )}
            </div>
            {file.file && (
              <AppButton
                className="w-fit"
                color="accent"
                startIcon={<ReplayIcon />}
                variant="outlined"
                onClick={() => setFile({ url: null, file: null })}
              >
                Zmień zdjęcie
              </AppButton>
            )}
            {fileInputErrors.map((error) => (
              <p key={error} className="flex items-center gap-2">
                <ErrorIcon /> {error}
              </p>
            ))}
            <TemplateModal ref={templateRef} setTemplateUrl={setTemplateUrl} templateUrl={templateUrl} />
          </div>
          <AppButton
            className="py-3 lg:py-5 lg:text-lg"
            disabled={generationTokenCountCookie.value === 0}
            endIcon={<EastRoundedIcon />}
            loading={shouldLoad}
            size="large"
            variant="contained"
            onClick={() => handleSubmit({ file, templateUrl })}
          >
            Stwórz swój portret
          </AppButton>
          {imageHistory.length > 0 && (
            <ImageHistory imageHistory={imageHistory} specialPromoCookie={specialPromoCookie} />
          )}
        </AppContainer.Content>
      </AppContainer>
      <BenefitsSection />
    </>
  );
};

export default PageGeneratePortraitContent;
