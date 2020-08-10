import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Cotizacion = ({result}) => {

    if(Object.keys(result).length === 0) return null

    return (
        <View style={styles.result}>
            <Text style={[styles.text, styles.price]}>
              <Text styles={styles.span}> { result.PRICE }</Text>
            </Text>

            <Text style={styles.text}> Precio mas alto del dia: { ' ' }
              <Text styles={styles.span}> { result.HIGHDAY }</Text>
            </Text>

            <Text style={styles.text}> Precio mas bajo del dia { ' ' }
              <Text styles={styles.span}> { result.LOWDAY }</Text>
            </Text>

            <Text style={styles.text}> Variación ultimas 24 horas: { ' ' }
              <Text styles={styles.span}> { result.CHANGEPCT24HOUR }% </Text>
            </Text>

            <Text style={styles.text}> Ultima Actualización { ' ' }
              <Text styles={styles.span}> { result.LASTUPDATE }</Text>
            </Text>
        </View>
    )
}

export default Cotizacion

const styles = StyleSheet.create({
  result: {
    backgroundColor: '#5E49E2',
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10
  },
  price: {
    fontSize: 38
  },
  span: {
    fontFamily: 'Lato-Black',
  }
})