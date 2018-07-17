import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Product from '../../components/Product';
import { FlatList } from '../../../node_modules/react-native-gesture-handler';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { products: null };
        this.handlePress = this.handlePress.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    
    componentDidMount () {
		this.fetchProducts();
    }

    handlePress (styleId) {
        // Handle product click
        alert(styleId);
    }

    keyExtractor = (item) => item.styleid
    
    async fetchProducts() {
		const query = this.props.navigation.getParam('query','');
		let url = `http://developer.myntra.com/search/data/${query}`;
		/*fetch(url)
			.then(result => result.json())
			.then(r => alert(r.data.results.products.length))
			.catch(e=>alert(e));*/ // Another way to fetch from URL
		const response = await fetch(url);
		const responseJson = await response.json();
		this.setState({
			products: responseJson.data.results.products,
			loading:true
		})
		//alert(JSON.stringify(this.state.products));
        
    }

    renderItem ({ index, item }) {
		return (
			<Product
				productData={ item }
				position={ index }
				handlePress={ this.handlePress }
			/>
		);
	}

	render() {
        if (this.state.loading) {
            return (<View style={styles.container}>
                <Text style={styles.text}> loading... </Text>
            </View>);
        }
		return (
			<FlatList
                contentContainerStyle={styles.listContainer}
                data={this.state.products}
                numColumns={2}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                removeClippedSubviews
            />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    text: {
        color: '#94989f',
    },
});