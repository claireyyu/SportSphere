import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './PressableButton';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { SIZE, SPACING } from '../global';

export default function ImageManager() {
  const [images, setImages] = React.useState([]);
  const [imageResponse, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraResponse, requestCameraPermission] = ImagePicker.useCameraPermissions();

  async function verifyImagePermissions() {
    try {
        if (imageResponse.granted) {
            return true;
        }
        const permissionRequest = await requestImagePermission();
        return permissionRequest.granted;
      } catch (error) {
        console.log("verifying library access permission", error);
        return false;
      }
    }
  async function verifyCameraPermissions() {
    try {
        if (cameraResponse.granted) {
            return true;
        }
        const permissionRequest = await requestCameraPermission();
        return permissionRequest.granted;
      } catch (error) {
        console.log("verifying camera access permission", error);
        return false;
      }
    }

  async function pickImageHandler() {
    try {
        const hasPermission = await verifyImagePermissions();
        if (!hasPermission) {
            Alert.alert("Permission required", "You need to grant permission to access your library to pick an image.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        });

        console.log(result);

        if (!result.canceled) {
        console.log("Image uri", result.assets[0].uri);
        setImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }
    } catch (error) {
        console.log("Error picking image", error);
      } 
  }

  async function takePhotoHandler() {
    try {
        const hasPermission = await verifyCameraPermissions();
        if (!hasPermission) {
            Alert.alert("Permission required", "You need to grant permission to access your camera to take a photo.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        });

        console.log(result);

        if (!result.canceled) {
          setImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }

    } catch (error) {
        console.log("Error taking photo", error);
      }
    }
  return (
    <>
    <View style={styles.buttonContainer}>
        <Text style={styles.textInfo}>Add Photos for your activity: </Text>
        <PressableButton pressedFunction={takePhotoHandler}>
            <Feather name="camera" size={24} color="black" />
        </PressableButton>
        <PressableButton pressedFunction={pickImageHandler}>
            <AntDesign name="picture" size={24} color="black" />
        </PressableButton>
    </View>
    <ScrollView horizontal={true}>
        {images && images.map((image, index) => (
            <Image key = {index} source={{ uri: image }} style={styles.image} />
        ))}
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    marginLeft: 0,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: SIZE.image,
    height: SIZE.image,
    margin: SPACING.xsmall,
    opacity: 0.9,
  },
})
