import React, { useEffect, useContext } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './PressableButton';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SIZE, SPACING } from '../global';
import { QueryContext } from '../context/QueryProvider';

export default function ImageManager({
  existingImages,
  newImages,
  setNewImages,
  deletedImages,
  setDeletedImages,
}) {
  const [imageResponse, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraResponse, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const { imagePermission, setImagePermission } = useContext(QueryContext);

  // Prepare existing images for display (filter out deleted ones)
  const displayedExistingImages = existingImages
    .filter((image) => !deletedImages.includes(image.storagePath))
    .map((image) => ({
      uri: image.downloadURL,
      storagePath: image.storagePath,
    }));

  // Prepare new images for display
  const displayedNewImages = newImages.map((uri) => ({ uri }));

  // Combine all images to be displayed
  const displayedImages = [...displayedExistingImages, ...displayedNewImages];
  console.log("displayedImages", displayedImages);

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
        Alert.alert(
          "Permission required",
          "You need to grant permission to access your library to pick an image."
        );
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
        setNewImages((prevImages) => [...prevImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.log("Error picking image", error);
    }
  }

  async function takePhotoHandler() {
    try {
      const hasPermission = await verifyCameraPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission required",
          "You need to grant permission to access your camera to take a photo."
        );
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
        setNewImages((prevImages) => [...prevImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.log("Error taking photo", error);
    }
  }

  function handleDeleteImage(image) {
    console.log("long pressed for deletion", image);
    if (image.storagePath) {
      setDeletedImages((prevImages) => [...prevImages, image.storagePath]);
    } else {
      setNewImages((prevImages) => prevImages.filter((uri) => uri !== image.uri));
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
      <ScrollView horizontal={true} style={{ marginTop: SPACING.small }}>
        {displayedImages.map((image, index) => (
          <PressableButton
            key={image.uri}
            pressedFunction={() => handleDeleteImage(image)}
            componentStyle={styles.imageContainer}
          >
            <Image source={{ uri: image.uri }} style={styles.image} />
          </PressableButton>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: SPACING.small,
    marginLeft: SPACING.None,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    margin: SPACING.xsmall,
  },
  image: {
    width: SIZE.image,
    height: SIZE.image,
    opacity: 0.9,
  },
});
