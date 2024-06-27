import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useAppSelector, useAppDispatch } from "@/hooks";
import { logout } from '@/redux/authSlice';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const { status, error, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('auth/signin');
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})