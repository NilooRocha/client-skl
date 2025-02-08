import { Text, TextProps } from 'react-native';

export function TextRoboto({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Roboto_500Bold' }, style]} />;
}
