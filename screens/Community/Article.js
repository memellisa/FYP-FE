import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert, KeyboardAvoidingView, TextInput} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getPostByID } from "../../utils/api/community.api";
import { fDate } from '../../utils/formatTime';
import { Icon } from '@rneui/base';
import Comment from "../../components/Comment";
import { useHeaderHeight } from '@react-navigation/elements'
import { postComment } from "../../utils/api/community.api";
import { auth } from "../../config";


function Article({route}) {
    const { article_id } = route.params;
    const [comment, setComment] = useState("")
    const [article, setArticle] = useState({})
    const height = useHeaderHeight()

 
    const fetchPost = async () => {
        const result = await getPostByID(article_id)

        if (!result.error) {
            setArticle(result.data)
        } 
          else {
            // Alert.alert('Something went wrong getting USER. Please try again')
        }
    }


    const handlePostComment = async () => {
        await postComment(article_id, auth.currentUser.uid, comment)
        setComment('')
        fetchPost()
    }


    useEffect(() => {
        fetchPost()
    }, []);
    
    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                keyboardVerticalOffset={height}
                behavior="padding"
                style={styles.container}
                enabled>
                <ScrollView 
                    automaticallyAdjustKeyboardInsets={true} >
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
                    
                    <Text style={styles.commentHeading}>Comments:</Text>
                    <Text style={styles.info}>
                        {article.comments ? article.comments.length + ' comment(s)' : 0 + ' comment(s)'} 
                    </Text>
                    <View style={{...styles.commentSection }}>
                    {article.comments ? <Comment comment={article.comments}/> : ""}
                    </View>
                </ScrollView>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.commentInput} 
                        placeholder='Type your comment here...'
                        value={comment}
                        onChangeText={(text) => setComment(text)}/>
                    <Icon 
                        name="send" 
                        color={comment !== '' ? "#0F52BA" : "grey"}
                        size='25'  
                        onPress={comment !== '' ?  handlePostComment : null}
                        /> 
                </View>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom:30
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
          fontFamily: 'Poppins-Regular'
      },
  
      text: {
          color: '#22223b',
          fontSize: 17,
          textAlign: 'justify',
          paddingTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 20,
          fontFamily: 'Poppins-Regular'
      },
  
      commentView: {
          marginTop: 20,
          marginRight: 25,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
      },
      commentSection: {
          marginVertical: 10,
          flex: 1,
          alignItems: 'center',
      },
      commentInput: {
          width: '85%',
          marginRight: 10,
          padding: 12,
          fontSize: 16,
          borderRadius: 12,
          borderWidth: 0.2,
          borderColor: 'grey',
      },
  
      icon: {
          marginLeft: 20
      },
  
      inputView: {
        marginHorizontal: 20,
        marginBottom: 25,
        marginTop: 5, 
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
          width: '75%',
      },
  
      userName: {
          color: 'grey',
          fontSize: 15,
          paddingLeft: 20,
          fontFamily: 'Poppins-Regular'
      }
});

export default Article;