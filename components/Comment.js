import { Avatar, Card, Icon } from "@rneui/base"
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';

const Comment = ({comment}) => {
    const user = {
        firstName: 'Jane',
        lastName: 'Doe',
        imgURI: null
    } // should fetch from comment
    
    const [like, setLike] = useState(false) // later fetch from db
    const handleLikeClicked = () => {
        setLike(!like)
    }


    return(
        <View style={styles.postedComment}>
            <Avatar
                size={45}
                rounded
                source={{uri: user.imgURI ? user.imgURI : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }}
                containerStyle={{ backgroundColor: '#6733b9' }}
            />
            <View>
                <Text style={styles.userName}>{user.firstName + user.lastName}</Text>
                <View style={styles.commentContent}>
                    <Card containerStyle={styles.commentContainer}>
                        {/* <Text style={styles.commentText}>{comment.content}</Text> */}
                        <Text style={styles.commentText}>HELLO HELLO HELLO</Text>
                        
                    </Card>
                    <Icon
                        name={like ? "favorite" : "favorite-border" }
                        color={like ? "red" : "#0F52BA"} 
                        size='22'  
                        containerStyle={styles.icon} 
                        onPress={handleLikeClicked}/> 
                            {/* add numb of likes*/}
                </View>
                <Text style={styles.commentLikes}>{100 + ' likes'}</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    postedComment:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10
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
