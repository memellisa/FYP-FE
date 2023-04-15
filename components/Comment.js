import { Avatar, Card } from "@rneui/base"
import { View, Text, StyleSheet } from 'react-native';
import { fDate } from "../utils/formatTime";
import { auth } from "../config";
import { useEffect, useState } from "react";
import { getUserByUID } from "../utils/api/user.api";
import { te } from "date-fns/locale";

const Comment = ({comment}) => {
    const user_uid = auth.currentUser.uid
    var key_index = 0

    const [arrayComponent, setArrayComponent] = useState([])

    const getAvatarAndName = async (uid) => {
        const result = await getUserByUID(uid);
        if (!result.error){
            return {"avatar": result.data.info.img, "name": result.data.info.firstName + " " + result.data.info.lastName}
        } else {
        // Alert.alert('Something went wrong getting Activities. Please try again')
            return {"avatar": "", "name": ""}
        }
    }

    const renderAllUserComment = async () => {
        let temp = []
        await Promise.all(comment.map(async (comm) => {
            const result = await getUserByUID(comm.user_id);
            if (!result.error){
                temp.push({"avatar": result.data.info.img, "name": result.data.info.firstName + " " + result.data.info.lastName})
            } else {
            // Alert.alert('Something went wrong getting Activities. Please try again')
                temp.push({"avatar": "", "name": ""})
            }
        }))
        setArrayComponent(temp)
    }


    useEffect(() => {
        renderAllUserComment();
    }, [])

    return(
        <View style={styles.postedComment}>
            {arrayComponent.map((comp, idx) => {
                return (<View  key={idx} style={{flexDirection: "row", marginBottom: 20}}>
                    <Avatar
                        size={45}
                        rounded
                        source={{uri: comp.avatar ? comp.avatar : "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg" }}
                        containerStyle={{ backgroundColor: '#6733b9' }}
                    />
                    <View style={styles.commentContent}>
                        <Text style={styles.userName}>{user_uid == comment[idx].user_id ? "You" : comp.name}</Text>
                        <Card containerStyle={styles.commentContainer}>
                            <Text style={styles.commentText}>
                                {comment[idx].comment}
                            </Text>
                            
                        </Card>
                        <Text style={styles.date}>{fDate(comment[idx].date)}</Text> 
                    </View>
                </View>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({

    postedComment:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 30,
    },

    commentContainer: {
        marginTop: 5,
        marginRight: 5,
        padding: 10,
        width: '85%',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15
    },

    commentText: {
        fontSize: 16,
        width: '100%'
    },

    userName: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: 20,
        fontFamily: 'Poppins-Regular'
    },

    commentContent: {
        flexDirection: 'column',
        width: '95%'
    },
    
    date: {
        color: 'grey',
        fontSize: 13,
        paddingLeft: 20,
        fontFamily: 'Poppins-Regular'
    }

});

export default Comment