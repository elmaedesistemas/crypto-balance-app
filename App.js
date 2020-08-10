/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import axios from 'axios'


const App = () => {

  const [currency, setCurrency] = useState('')
  const [crypto, setCrypto] = useState('')
  const [quoteAPI, setQuoteAPI] = useState(false)
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('QuoteAPI was changed! ')
    const executeQuote = async () => {
      if (quoteAPI) {
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`
        const result = await axios.get(URL)
        // console.log('result', result.data.DISPLAY[crypto][currency])
        setLoading(true)

        setTimeout(() => {
          setResult(result.data.DISPLAY[crypto][currency])
          setQuoteAPI(false)
          setLoading(false)
        }, 3000)
      }
    }
    executeQuote()
  }, [quoteAPI])

  const component = loading ? <ActivityIndicator size='large' color='#5E49E2' /> : <Cotizacion result={result} />

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Image source={require('./assets/img/cryptomonedas.png')} style={styles.image} />
          <View style={styles.container}>
            <Formulario currency={currency} crypto={crypto} setCurrency={setCurrency} setCrypto={setCrypto} setQuoteAPI={setQuoteAPI} />
          </View>
          <View style={{marginTop: 40}}>
            {component}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  container: {
    marginHorizontal: '2.5%'
  }

});

export default App;
