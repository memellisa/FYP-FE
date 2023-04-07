import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getPostByID } from "../../utils/api/community.api";
import { fDate } from '../../utils/formatTime';
import BottomSheet, { BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Avatar, Button, Card, FAB, Icon, Input } from '@rneui/base';
import Comment from "../../components/Comment";
import { postComment } from "../../utils/api/community.api";
import { auth } from "../../config";


function Article({navigation, route}) {
    const { article_id } = route.params;
    const [comment, setComment] = useState("")
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [article, setArticle] = useState({})

 
    const fetchPost = async () => {
        const result = await getPostByID(article_id)

        if (!result.error) {
            setArticle(result.data)
        } 
          else {
            Alert.alert('Something went wrong getting USER. Please try again')
        }
    }


    const handlePostComment = async () => {
        await postComment(article_id, auth.currentUser.uid, comment)
        setComment('')
        fetchPost()
    }

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', comment);
    }, []);

    const handleLikeClicked = () => {
        setLike(!like)
    }

    const handleSnapPress = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        fetchPost()

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, []);
    
    return (
        <SafeAreaProvider>
            <ScrollView 
                automaticallyAdjustKeyboardInsets={true} 
                style={styles.container} >
                <Image
                    style={styles.image}
                    source={{uri: article.img}}/>
                <Text style={styles.heading}>{article.title}</Text>

                <Text style={styles.text}>
                    {article.content}
                </Text>

                <Text style={styles.info}>
                    Written By: {article.author}
                    {"\n"}
                    {fDate(article.date)}
                </Text>
            </ScrollView>
            {/* <FAB  
                style={{bottom:70}}
                placement="right"
                icon={{ name:like ? "favorite" : "favorite-border", color: "white"}}
                color="#0F52BA"
                size="small"
                title={article.likes ? article.likes.toString() : "0"}
                onPress={handleLikeClicked}/> */}
        
            <FAB  
                style={{bottom:20}}
                placement="right"
                icon={{ name:"comment", color: "white", size:23 }}
                color="#0F52BA"
                size="small"
                title={article.comments ? article.comments.length.toString() : "0"}
                onPress={handleSnapPress}/>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
            >
                <View style={styles.commentInput}>
                    <BottomSheetTextInput 
                        style={styles.bottomSheetInput} 
                        placeholder='Type your comment here...'
                        value={comment}
                        onChangeText={(text) => setComment(text)}/>
                    <Icon 
                        name="send" 
                        color="#0F52BA" 
                        size='25'  
                        onPress={handlePostComment}
                         /> 
                </View>
               
                <Text style={styles.commentHeading}>Comments:</Text>
                <Text style={styles.info}>
                    {article.comments ? article.comments.length + ' comment(s)' : 0 + ' comment(s)'} 
                </Text>
                <BottomSheetScrollView contentContainerStyle={{...styles.bottomSheetContent }}>
                   {article.comments ? <Comment comment={article.comments}/> : ""}
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
  
      heading: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold'
      },
  
      commentHeading: {
          color: 'black',
          fontSize: 23,
          textAlign: 'left',
          paddingTop: 20,
          paddingLeft: 20,
          fontWeight: 'bold',
          fontFamily: 'Poppins-SemiBold'
        },
  
      subheading: {
        color: '#0096FF',
        fontSize: 15,
        fontFamily: 'Poppins-Regular'
      },
  
      image: {
          width: '100%',
          height: 200,
          marginBottom: 10
      },
  
      input: {
          paddingStart: 20, 
          paddingEnd:20
      },
  
      info: {
          color: 'grey',
          fontSize: 14,
          textAlign: 'left',
          paddingLeft: 20,
          paddingBottom: 30,
          fontFamily: 'Poppins-Regular'
      },
  
      text: {
          color: '#22223b',
          fontSize: 17,
          textAlign: 'justify',
          paddingTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 40,
          fontFamily: 'Poppins-Regular'
      },
  
      commentView: {
          marginTop: 20,
          marginRight: 25,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
      },
      bottomSheet: {
          flex: 1,
          padding: 24,
          backgroundColor: 'grey',
      },
      bottomSheetContent: {
          marginVertical: 10,
          flex: 1,
          alignItems: 'center',
      },
      bottomSheetInput: {
          width: 310,
          marginRight: 10,
          padding: 12,
          fontSize: 16,
          borderRadius: 12,
          borderWidth: 0.2,
          borderColor: 'grey',
          textAlign: "center",
      },
  
      icon: {
          marginLeft: 20
      },
  
      commentInput: {
          marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
      },
  
      postedComment:{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: 10
      },
  
      commentContainer: {
          marginTop: 5,
          borderBottomRightRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15
      },
  
      commentText: {
          fontSize: 16,
          width: 260,
      },
  
      userName: {
          color: 'grey',
          fontSize: 15,
          paddingLeft: 20,
          fontFamily: 'Poppins-Regular'
      }
});

export default Article;