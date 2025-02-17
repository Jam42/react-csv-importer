import React, { useRef, useEffect } from 'react';

import { TextButton } from './TextButton';
import { IconButton } from './IconButton';

import './ImporterFrame.scss';

export const ImporterFrame: React.FC<{
  fileName: string;
  subtitle?: string; // @todo allow multiple crumbs
  secondaryDisabled?: boolean;
  secondaryLabel?: string;
  nextDisabled?: boolean;
  nextLabel?: string;
  error?: string | null;
  onSecondary?: () => void;
  onNext: () => void;
  onCancel?: () => void;
  CustomImporterFrame?: React.FC<{ isComplete?: boolean; isError?: boolean }>;
  isComplete?: boolean;
  isError?: boolean;
}> = ({
  fileName,
  subtitle,
  secondaryDisabled,
  secondaryLabel,
  nextDisabled,
  nextLabel,
  error,
  onSecondary,
  onNext,
  onCancel,
  children,
  CustomImporterFrame,
  isComplete,
  isError
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (subtitleRef.current) {
      subtitleRef.current.focus();
    } else if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  if (CustomImporterFrame) {
    return <CustomImporterFrame isComplete={isComplete} isError={isError} />;
  }

  return (
    <div className="CSVImporter_ImporterFrame">
      <div className="CSVImporter_ImporterFrame__header">
        <IconButton
          label="Go to previous step"
          type="arrowBack"
          disabled={!onCancel}
          onClick={onCancel}
        />

        <div
          className="CSVImporter_ImporterFrame__headerTitle"
          tabIndex={-1}
          ref={titleRef}
        >
          {fileName}
        </div>

        {subtitle ? (
          <>
            <div className="CSVImporter_ImporterFrame__headerCrumbSeparator">
              <span />
            </div>
            <div
              className="CSVImporter_ImporterFrame__headerSubtitle"
              tabIndex={-1}
              ref={subtitleRef}
            >
              {subtitle}
            </div>
          </>
        ) : null}
      </div>

      {children}

      <div className="CSVImporter_ImporterFrame__footer">
        <div className="CSVImporter_ImporterFrame__footerFill" />
        {error ? (
          <div className="CSVImporter_ImporterFrame__footerError" role="status">
            {error}
          </div>
        ) : null}

        {secondaryLabel ? (
          <div className="CSVImporter_ImporterFrame__footerSecondary">
            <TextButton disabled={!!secondaryDisabled} onClick={onSecondary}>
              {secondaryLabel}
            </TextButton>
          </div>
        ) : null}
        <TextButton disabled={!!nextDisabled} onClick={onNext}>
          {nextLabel || 'Next'}
        </TextButton>
      </div>
    </div>
  );
};
