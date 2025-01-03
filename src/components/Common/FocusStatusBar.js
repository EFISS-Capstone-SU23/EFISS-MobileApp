/* eslint-disable react/jsx-props-no-spreading */
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function FocusStatusBar(props) {
	const isFocused = useIsFocused();

	return isFocused ? <StatusBar animated {...props} /> : null;
}

export default FocusStatusBar;
