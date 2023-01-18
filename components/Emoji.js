import React from 'react';
import { Text } from 'react-native';
const Emoji = ({label, symbol}) => (
    <Text
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
        style={{fontSize:30}}
    >
        {symbol}
    </Text>
);
export default Emoji;