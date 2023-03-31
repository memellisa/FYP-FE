import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ArticleCard from '../../components/ArticleCard';
import Header from '../../components/Header';

const dummydata = [
    {
        article_id: 1,
        article_date: "Monday, 27 March 2023",
        article_img: "http://static1.squarespace.com/static/5b329034af2096dfb05592a4/5b360b278a922d62fc135378/5dfcadcec5299e0f8827e527/1577712457527/?format=1500w",
        categories: "Cardio",
        title: "Running To Achieve Your Cardio Goal",
        author: "John Doe",
        content: `Let’s start at the beginning. Running is the action or movement of propelling yourself forward rapidly on foot, according to Amy Morris, a Road Runners Club of America (RRCA)–certified running coach and head of personal training at CrossTown Fitness, a Chicago-based gym.

        It’s different from walking because when you walk, one foot is always on the ground. But with running, there's a moment when both feet are off the ground. That's what makes running a high-impact activity.
        
        Depending on the type of running you’re doing, it can be aerobic exercise, anaerobic exercise, or a combination of both. Aerobic and anaerobic exercise are the two subtypes of cardiovascular exercise: During aerobic exercise oxygen intake and heart rate stay consistent over a period of time, whereas anaerobic exercise involves quick bursts of energy performed at your highest level of effort for a short time, per ACE Fitness.
        
        Running is aerobic if you’re keeping your pace and energy expenditure fairly consistent. Think distance running and endurance training. The body uses oxygen to create the energy needed to keep you going, Morris explains. These workouts are traditionally the long runs, easy pace runs, and recovery runs, and should make up the majority of a runner’s weekly mileage.
        
        Think of anaerobic running as sprints and other types of speed work. “With anaerobic running, your body is able to perform at high intensity using the stored energy in your muscles without oxygen, and this usually lasts anywhere from less than six seconds and up to two minutes,” Morris says. 
        
        Morris suggests that the average adult spend a minimum of 16 to 24 weeks to build a proper base for efficient aerobic running. After that, aneerobic running can help improve performance, she says, especially in terms of speed.`,
        comment: [{
            user_uid: 1,
            date: "String",
            content: "String",
            comment: []
        }]
    },
    {
        article_id: 2,
        article_date: "Sunday, 26 March 2023",
        article_img: "https://www.shutterstock.com/image-vector/cardio-exercises-fitness-training-artworks-260nw-1369451879.jpg",
        categories: "Cardio",
        title: "How Important is Cardio?",
        author: "Elizabeth Miller",
        content: `All healthcare experts will agree that being physically active is crucial to keeping your body healthy. It helps your body function at a high level by improving cardiovascular health and muscle strength. Fortunately, individuals have a myriad of options to choose from to keep them active, and all provide countless health benefits, both physical and mental. One of the easiest and most popular forms of exercise is cardio.
        Throughout human history, people have been running. Whether for survival or sport, running has persisted throughout. However, running is far from the only form of cardio. From running and jogging to swimming and biking, you can choose from several cardio options. Regardless of the type of cardio you do, the benefits that this physical activity provide you are exceptional.
        Physical activity is vital to your overall health, and cardio plays a big role. Even if you prefer lifting weights, you should include cardio because it offers benefits that weightlifting cannot match. At Fitness Nation, we offer our members plenty of different cardio options to choose from, whether from our state-of-the-art equipment or one of our many classes. If you’re ready to start working towards your fitness goals, sign up with us today.
                
        Many people forget that your heart is a muscle, and like all muscles, it requires exercise. 
        If you don’t work it, it will weaken much quicker over time. Getting your heart pumping at faster rates on a regular basis keeps it in shape and healthy, reducing the risk of heart disease. 
        Cardio helps lower your blood pressure by reducing the levels of bad cholesterol and raising levels of good cholesterol. This will eventually lower your resting heart rate because your heart pumps blood more efficiently.`,
        comments: []
    },

]
function Group(navigation, group) {
    const [articleList, setArticleList] = useState([])

    const leftComponent = <View style={{width:350}}>
                              <Text style={styles.heading}>Cardio</Text> 
                              {console.log("Change Cardio to Group Later")}
                        </View>

    useEffect(() => {
        setArticleList(dummydata) //Change to request to BE
    }, [])

    return(
        <SafeAreaProvider>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 35}}>
                <Header leftComponent={leftComponent} rightComponent={{}}/>
                <View style={{alignItems: 'center',}}>
                    {articleList.map((article) => (
                        <ArticleCard 
                            imgURI={article.article_img}
                            author={article.author}
                            date={article.article_date}
                            title={article.title}
                            content={article.content.substring(0,100) + "..."}
                            minWidth={350}
                            onPress={() => console.log(navigation.navigation.push("Article", { article: article }))}
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
});

export default Group;