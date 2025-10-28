import { View,Image, Text, ImageBackground } from "react-native";
import { Tabs, Redirect } from "expo-router";
import {icons} from "../../constants";
import { colorScheme } from "nativewind";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="align-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{tabBarShowLabel:false}}>
        <Tabs.Screen 
          name="home"
          options={{ 
            title: "Home",
            headerShown: false, 
            
            tabBarIcon:({focused, color, name, icon}) =>(
            <>
              <Image 
              source={icon}
              resizeMode="contain"
              tintColor={color}
              />
              <Text>Home</Text>
            </>
            )
          }}
          />
      </Tabs>
    </>
  );
};

export default TabsLayout;
