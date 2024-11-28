import React, {useEffect} from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './PressableButton';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { SIZE, SPACING } from '../global';
import { set } from 'date-fns';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

// export default function ImageManager({images, imagesHandler, downloadURLs=null}) {
  //const [images, setImages] = React.useState([]);
  export default function ImageManager({existingImages, onImagesChange}) {
  const [newImages, setNewImages] = React.useState([]);
  const [deletedImages, setDeletedImages] = React.useState([]); // stoage path of images to be deleted
  const [imageResponse, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraResponse, requestCameraPermission] = ImagePicker.useCameraPermissions();
  //const [existingImages, setExistingImages] = React.useState([]);
  //const [existingImagesShown, setExistingImagesShown] = React.useState([]);
  //console.log("existingImages", existingImagesShown);
  //const allImages = [...existingImagesShown, ...newImages];
  //console.log("allImages", allImages);

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

  // useEffect(() => {
  //   setExistingImagesShown(existingImages);
  // }, [existingImages]);

  useEffect(() => {  
    //setExistingImages(existingImages);
    onImagesChange({
      newImages,
      deletedImages,
    });
  }, [newImages, deletedImages]);


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
          setNewImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }

    } catch (error) {
        console.log("Error taking photo", error);
      }
    }

    function handleDeleteImage(image) {
      console.log("long pressed for deletion", image);
      if (image.storagePath) {
        setDeletedImages((prevImages) => [...prevImages, image.storagePath]);//Mark existing image for deletion
        // const imageRef = ref(storage, uri);
        // await deleteObject(imageRef);
        //setExistingImagesShown((prevImages) => prevImages.filter((image) => image !== uri));  
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
    {/* {downloadURLs ? 
      <ScrollView horizontal={true} style={{marginTop: SPACING.small}}>
          {downloadURLs.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))}
            {images && images.map((image, index) => (
              <Image key = {index} source={{ uri: image }} style={styles.image} />
          ))}
      </ScrollView>:
      <ScrollView horizontal={true} style={{marginTop: SPACING.small}}>
        {images && images.map((image, index) => (
            <Image key = {index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>} */}
      <ScrollView horizontal={true} style={{marginTop: SPACING.small}}>
        {displayedImages.map((image, index) => (
            <PressableButton key={image.uri} onLongPress={() => handleDeleteImage(image)}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </PressableButton>
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
    margin: SPACING.small,
    marginLeft: SPACING.None,
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