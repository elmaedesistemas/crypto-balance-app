import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from 'react-native'
import axios from 'axios'

export default function Formulario({ currency, crypto, setCurrency, setCrypto, setQuoteAPI}) {

    const [cryptos, setCryptos] = useState([])

    useEffect(() => {
      const queryAPI = async () => {
        const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const result = await axios.get(URL)
        console.log('result', result.data.Data)
        setCryptos(result.data.Data)
      }
      queryAPI()
    }, [])

    const getCurrency = currency => {
      console.log('currency', currency)
      setCurrency(currency)
    }

    const getCrypto = crypto => {
      console.log('cryptocurrency', crypto)
      setCrypto(crypto)
    }

    const quotePrice = () => {
      if(currency.trim() === '' || crypto.trim() === '') {
        showAlert()
        return
      }

      // pass validation
      console.log('Quote...')
      setQuoteAPI(true)
    }

    const showAlert = () => {
      Alert.alert(
        'Error...',
        'Ambos son obligatorios',
        [
          {text: 'ok!'}
        ]
      )
    }

    return (
      <View>
        <Text style={styles.label}>Currency</Text>
        <Picker
          selectedValue={currency}
          onValueChange={currency => getCurrency(currency)}
          itemStyle={{ height: 120}}
        >
            <Picker.Item label={'- Seleccione -'} value='' />
            <Picker.Item label={'COLON'} value='CRC' />
            <Picker.Item label={'Dolar'} value='USD' />
            <Picker.Item label={'Peso Mexicano'} value='MXN' />
            <Picker.Item label={'Euro'} value='EUR' />
            <Picker.Item label={'Libra Esterlina'} value='GBP' />
            
            
        </Picker>
        <Text style={styles.label}>Cryptocurrency</Text>
        <Picker
          selectedValue={crypto}
          onValueChange={crypto => getCrypto(crypto)}
          itemStyle={{ height: 120}}
        >
            <Picker.Item label={'- Seleccione -'} value='' />
            {
              cryptos.map(crypto => (
                <Picker.Item key={crypto.CoinInfo.Id} label={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name} />
              ))
            }
        </Picker>
        <TouchableHighlight
          style={styles.button}
          onPress={() => quotePrice()}>
          <Text style={styles.text} >Cotizar</Text>
        </TouchableHighlight>
      </View>
    )
}

const styles = StyleSheet.create({
  label: {
      fontFamily: 'Lato-Black',
      textTransform: 'uppercase',
      fontSize: 22,
      marginVertical: 20,
  },
  button: {
    backgroundColor: '#5349E2',
    padding: 10,
    marginTop: 20,
    color: '#FFF'
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})