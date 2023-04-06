import { Avatar, Card, Icon } from "@rneui/base"
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';
import { fDate } from "../utils/formatTime";
import { auth } from "../config";

const Comment = ({comment}) => {
    const user_uid = auth.currentUser.uid
    
    const [like, setLike] = useState(false) // later fetch from db
    const handleLikeClicked = () => {
        setLike(!like)
    }

    return(
        <View style={styles.postedComment}>
            {comment.map((comm) => {
                console.log("COMM", comm)
                let content = comm
                return <View style={{flexDirection: "row", marginBottom: 20}}>
                    <Avatar
                        size={45}
                        rounded
                        source={{uri: content.avatar ? content.avatar : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }}
                        containerStyle={{ backgroundColor: '#6733b9' }}
                    />
                    <View>
                        <Text style={styles.userName}>{user_uid == content.user_id ? "You" : content.name}</Text>
                        <View style={styles.commentContent}>
                            <Card containerStyle={styles.commentContainer}>
                                {/* <Text style={styles.commentText}>{comment.content}</Text> */}
                                <Text style={styles.commentText}>
                                    {content.comment}
                                </Text>
                                
                            </Card>
                            {/* <Icon
                                name={like ? "favorite" : "favorite-border" }
                                color={like ? "red" : "#0F52BA"} 
                                size='22'  
                                containerStyle={styles.icon} 
                                onPress={handleLikeClicked}/>  */}
                                    {/* add numb of likes*/}
                        </View>
                        <Text style={styles.commentLikes}>{fDate(content.date)}</Text> 
                    </View>
                </View>
            })}
        </View>
    )
}

const styles = StyleSheet.create({

    postedComment:{

        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30,
        // marginBottom: 170
    },

    commentContainer: {
        marginTop: 5,
        marginRight: 5,
        padding: 10,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15
    },

    commentText: {
        fontSize: 16,
        width: 250,
    },

    userName: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: 20,
        fontFamily: 'Poppins-Regular'
    },

    commentContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    commentLikes: {
        color: 'grey',
        fontSize: 13,
        paddingLeft: 20,
        fontFamily: 'Poppins-Regular'
    }

});

export default Comment