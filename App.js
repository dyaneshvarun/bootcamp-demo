import React from 'react';
import {StatusBar, Platform, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LandingPage from './src/apps/landingpage'
import Search from './src/apps/search'
import Bootcamp from './src/apps/bootcamp'

export default class App extends React.Component {
	
	render() {
		return (
			<View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
			  	<RootNavigator />
			</View>
		  )
	}
}

const RootNavigator = createStackNavigator(
	{
		Home: {
			screen: LandingPage,
			navigationOptions: ({ navigation }) => ({
				header: null
			})
		},
		Search: {
			screen: Search,
			navigationOptions: ({ navigation }) => ({
				title: 'Search',
				headerStyle:{
					marginTop: Platform.OS === 'ios' ? 0 : -StatusBar.currentHeight
				},
			})
		},
		Bootcamp:{
			screen: Bootcamp
		}
	},
	{
		initialRouteName: 'Home',
	}
);