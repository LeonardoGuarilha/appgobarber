import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

// Tenho todas as propriedades do input e mais o que eu adicionar
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// Uso o React.RefForwardingComponent porque eu preciso receber a referência, uso o React.RefForwardingComponent somente em casos que eu precise receber a referência
// O primeiro parâmetro é qual é o tipo da ref e o segundo é o InputProps
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Se tiver preenchido é true senão é false
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // Aula Usabilidade em formulários
  // useImperativeHandle, passar uma funcionalidade, uma função de um componente interno para um componente pai
  // O primeiro parametro é a ref que vem do RefForwardingComponent e o segundo paramentro é o que eu quero passar para o meu primeiro paramentro
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus(); // esse focus é o método que tá na InputRef
    },
  }));

  useEffect(() => {
    // Registro ele no unform
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {/* Passo todo o resto das propriedades menos o name e o icon para o TextInput */}
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input); // Uso esse forwardRef pq eu precisei criar o componente como React.RefForwardingComponent
