import { Avatar, Card } from "@rneui/base"
import { View, Text, StyleSheet } from 'react-native';
import { fDate } from "../utils/formatTime";
import { auth } from "../config";

const Comment = ({comment}) => {
    const user_uid = auth.currentUser.uid
    var key_index = 0

    return(
        <View style={styles.postedComment}>
            {comment.map((comm) => {
                key_index += 1
                return (
                    <View  key={key_index} style={{flexDirection: "row", marginBottom: 20}}>
                        <Avatar
                            size={45}
                            rounded
                            source={{uri: comm.avatar ? comm.avatar : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }}
                            containerStyle={{ backgroundColor: '#6733b9' }}
                        />
                        <View style={styles.commentContent}>
                            <Text style={styles.userName}>{user_uid == comm.user_id ? "You" : comm.name}</Text>
                            <Card containerStyle={styles.commentContainer}>
                                <Text style={styles.commentText}>
                                    {comm.comment}
                                </Text>
                                
                            </Card>
                            <Text style={styles.date}>{fDate(comm.date)}</Text> 
                        </View>
                    </View>
                )
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