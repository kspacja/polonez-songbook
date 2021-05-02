import { useRef } from 'react';
import { Input, InputWrapper, Reset } from './styles';

export interface SearchInputProps {
  handleChange: (value: string) => void;
  value: string;
  tipText?: string;
  placeholder?: string;
}

export default function SearchInput({
  handleChange,
  tipText,
  placeholder,
  value,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <InputWrapper>
      <Input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(event) => {
          const { value } = event.target;
          handleChange(value);
        }}
        data-tip={tipText}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <Reset
          onClick={() => {
            handleChange('');
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        />
      )}
    </InputWrapper>
  );
}
