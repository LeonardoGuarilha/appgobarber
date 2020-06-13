import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

// Tenho todas as propriedades do input e mais o que eu adicionar
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    {/* Passo todo o resto das propriedades menos o name e o icon para o TextInput */}
    <Icon name={icon} size={20} color="#666360" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      {...rest}
    />
  </Container>
);

export default Input;
