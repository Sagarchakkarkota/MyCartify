import { Image, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../theme/colors';
import { styles } from './profile.styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import { hexToRgba } from '../../utils/hexToRgba.utility';
import { useAuthStore } from '../../store/authStore';

const ProfileScreen = ({ navigation }: any) => {
  const { logout, user } = useAuthStore();
  if (!user) {
    return (
      <ScreenWrapper style={{ alignItems: 'center', justifyContent: 'center' }}>
        <CustomButton
          title="Login"
          onPress={() => navigation.getParent()?.navigate('Auth')}
        />
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Image source={{ uri: user?.image }} style={styles.avatar} />
        <Text style={styles.name}>{user?.firstName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={{}} />
      <View style={styles.card}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{user?.username}</Text>
      </View>

      <View style={styles.buttons}>
        <CustomButton
          title="My Orders"
          onPress={
            () => {}
            // navigation.navigate('Orders')
          }
        />
        <CustomButton
          title="Edit Profile"
          onPress={() => console.log('Edit')}
          style={{ backgroundColor: colors.light.gray }}
        />
        <CustomButton
          title="Logout"
          onPress={logout}
          style={{ backgroundColor: hexToRgba(colors.light.error, 0.8) }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
