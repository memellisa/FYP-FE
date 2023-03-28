import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Input } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Article({navigation, route}) {
    const [commentValue, setCommentValue] = useState("")

    const handleCommentChange = (event) => {
        setCommentValue(event.target.value)
    }

    const { article } = route.params;
    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 35}}>
                <Text style={styles.info}>
                    Written By: {article.author}
                    {"\n"}
                    {article.article_date}
                </Text>
                <Image
                    style={styles.image}
                    source={{uri: article.article_img}}/>
                <Text style={styles.heading}>{article.title}</Text>
                <Text style={styles.text}>
                    {article.content}
                </Text>

                <View style={{borderWidth: 0.5, marginTop: 20}}></View>

                <View>
                    <Text style={styles.heading2}>Comments:</Text>
                    <Input 
                        value={commentValue} 
                        onChangeText={value => setCommentValue(value)}
                        placeholder='Enter comment here...' 
                        style={styles.input} 
                        inputContainerStyle={{borderWidth: 1, borderRadius: 20, marginTop: 10}}
                    />
                </View>


            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    heading: {
      color: 'black',
      fontSize: 25,
      textAlign: 'center',
      // width: 250,
      fontWeight: 'bold',
      fontFamily: 'Poppins-SemiBold'
    },

    heading2: {
        color: 'black',
        fontSize: 23,
        textAlign: 'left',
        // width: 250,
        paddingTop: 20,
        paddingStart: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold'
      },

    subheading: {
      color: '#0096FF',
      fontSize: 15,
      // width: 250,
      fontFamily: 'Poppins-Regular'
    },

    image: {
        width: '100%',
        height: 200,
        marginVertical: 10
    },

    input: {
        paddingStart: 20, 
        paddingEnd:20
    },

    info: {
        color: 'black',
        fontSize: 13,
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 10,
        fontFamily: 'Poppins-Regular'
    },

    text: {
        color: '#22223b',
        fontSize: 16,
        textAlign: 'justify',
        paddingTop: 30,
        paddingStart: 20,
        paddingEnd: 20,
        fontFamily: 'Poppins-Regular'
    },
  
  });

export default Article;