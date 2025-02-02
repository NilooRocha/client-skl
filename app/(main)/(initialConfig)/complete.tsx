import { Image, View, Text } from 'react-native';

export default function Complete() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-2xl text-foreground">NICEEEE</Text>
      <Text className="text-2xl text-foreground">Weel done...</Text>
      <Image
        source={require('../../../assets/done.png')}
        style={{ width: '100%', height: 500, resizeMode: 'contain' }}
      />
    </View>
  );
}
