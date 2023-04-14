import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ArticleCard from '../../components/ArticleCard';
import { getPostsInForums } from '../../utils/api/community.api';
import { fDate } from '../../utils/formatTime';

export default function Group ({route, navigation}) {
    const [articleList, setArticleList] = useState({})
    const forumName = route.params.forumName


    const fetchArticleinForum = async () => {
        const result = await getPostsInForums(route.params.forumName)

        if (!result.error) {
            setArticleList(result.data.posts)
        } 
          else {
            // Alert.alert('Something went wrong getting USER. Please try again')
        }
    }

    useEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: '', 
            title: forumName

        });
    }, [navigation])

    useEffect(() => {
        fetchArticleinForum()
    }, [])

    return(
        <SafeAreaProvider>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 35}}>
                <View style={{alignItems: 'center',}}>
                    {Object.entries(articleList).map((article) => (
                        <ArticleCard
                            key={article[1].title} 
                            imgURI={article[1].img_url}
                            author={article[1].author}
                            date={fDate(article[1].date)}
                            title={article[1].title}
                            content={article[1].content_summary + "..."}
                            width={'90%'}
                            onPress={() => navigation.push("Article", { article_id: article[1].id })}
                    />
                    ))}
                </View>
            </ScrollView>
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
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold'
      },

    subheading: {
        color: '#0096FF',
        fontSize: 15,
        fontFamily: 'Poppins-Regular'
    },

    container_bot: { 
        paddingBottom: 20,
    },
    buttonStyle: {
        paddingStart:0,
        paddingEnd:0
    },
    textStyle: {
        fontSize: 12,
        padding: 0,
        margin:0
    },
});
