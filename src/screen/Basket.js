import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';
import {StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {cartLoading, deleteAllProduct, deleteCartItem, GetCartItem} from '../redux/action/cart.action';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import CheckoutScreen from './CheckoutScreen';
import { calculateOrderAmount } from '../../backend';

const Basket = ({route, navigation}) => {
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  // const total = []

  // const id = route.params;
  const item = useSelector(state => state.cartitem);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(GetCartItem());
  }, []);

  const deleteHandler = (id) => {
    dispatch(cartLoading)
      dispatch(deleteCartItem(id))
  }

  const deleteAllHandler = () => {
    dispatch(deleteAllProduct())
  }



  let totalPrice = 0
  item.cartItem.filter((p) => totalPrice = totalPrice + parseInt(p.price))  

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <View style={styles.itemImage}>
          {/* {totalHandler(price)} */}
        {
              item.category === 'wearable' ? 
              (<Image
                style={styles.image}
              source={{uri: item.imgURl}}
            /> ) : item.category==='laptop' ? ( <Image
              style={styles.image}
              source={{uri: item.imgURl}}

            />) : item.category === 'phones' ? ( <Image
              style={styles.image}
              source={{uri: item.imgURl}}

            />) : item.category ==='drones' ? ( <Image
              style={styles.image}
              source={{uri: item.imgURl}}

            />) : ( <Image
              style={styles.image}
              source={{uri: item.imgURl}}

            />)
            }
        </View>
        
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.Quantity}>
            <Text style={styles.quantityText}>Quantity</Text>
            <TouchableOpacity onPress={() => {
              if(quantity === 1){
                alert('Minimum product Value is 1')
              }else{setQuantity(quantity - 1)}
            }}>
              <Text style={styles.decreasBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterNum}> {quantity} </Text>
            <TouchableOpacity onPress={() => {
              setQuantity(quantity + 1)
            }}>
              <Text style={styles.decreasBtn}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.removebtn} onPress={() => deleteHandler(item.id)}>
            {item.isLoading === true ? 
                <ActivityIndicator size="small" color="#0000ff" />
                :
            <MaterialCommunityIcons color={'#FA4A0C'} size={25} name='delete-empty' />
          }
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.back}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color={'#000000'} size={30} />
          </TouchableOpacity>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.favrioteText}>Basket</Text>
          </View>
          <TouchableOpacity onPress={() => deleteAllHandler()}>
            <MaterialIcons name="delete-outline" color={'#FA4A0C'} size={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.FavoriteItemView}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#D3F2FF',
              padding: 7,
              marginTop: 20,
              marginBottom: 5,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Feather name="bell" color={'#FA4A0C'} size={20} />
            <Text style={{color: '#000000', fontWeight: '600', fontSize: 12}}>
              Delivery for FREE until the end of the month
            </Text>
          </View>
        </View>
        <View style={{height: '65%', marginHorizontal: 20}}>
          <ScrollView>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              legacyImplementation={false}
              data={item.cartItem}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            // justifyContent: 'space-around',
            // height: '20%',
            position: 'absolute',
            bottom: 0,
            width: '90%'
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#000000',fontSize: 18,fontWeight: 'bold'}}>Total</Text>
            <Text style={styles.itemPrice}>$ {totalPrice}</Text>
          </View>

          <TouchableOpacity
            style={{width: '90%', alignSelf: 'center', marginVertical: 10}} 
            >
              <StripeProvider
              publishableKey="pk_test_51LNYxZSDfkRpEt9y8Qnga24uWhgyLC6ONu3eMLnzuIvbpaVwDQTJd7wPTefythkquVUnyIIfCM8h1S7iP3s6yK4m00mbWVxSXi"
              urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
              merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                backgroundColor: '#5956E9',
                borderRadius: 10,
              }}>
              {/* <Text style={styles.btnText}>Checkout</Text> */}
              <CheckoutScreen n = {navigation} />
            </View>
            </StripeProvider>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#E5E5E5"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    </View>
    </SafeAreaView>
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container2: {
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#ffffff',
  },
  back: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favrioteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  backArrow: {},
  FavoriteItemView: {
    alignItems: 'center',
  },
  NoitemFavorite: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailFavoriteText: {
    textAlign: 'center',
    marginVertical: 7,
    color: 'gray',
  },
  itemView: {
    overflow: 'hidden',
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  itemImage: {
    width: '35%',
    backgroundColor: '#F4F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 100,
    width: 90,
    borderRadius: 10,

  },
  itemText: {
    width: '60%',
    justifyContent: 'space-around',
    margin: 10,
    marginVertical: 20,
  },
  itemTitle: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5956E9',
  },
  Quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 15,
    color: '#000000',
    marginRight: 10,
  },
  decreasBtn: {
    backgroundColor: '#7DCCEC',
    paddingHorizontal: 5,
    borderRadius: 2,
    marginHorizontal: 3,
    // color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  counterNum: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  removebtn:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
