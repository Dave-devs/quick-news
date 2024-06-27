import React from "react";
import { Tabs } from "expo-router";
import { Feather, MaterialIcons, Foundation } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Foundation name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="local-fire-department"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
