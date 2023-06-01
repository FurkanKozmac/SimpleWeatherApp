import React from 'react'
import { Text, StyleSheet } from 'react-native'

export  const DateTime = () => {
  const currentDate = new Date()
  let day = currentDate.getDate()
  const month = currentDate.getMonth()
  let currentMonth = month + 1
  const year = currentDate.getFullYear()

  if (day < 10) {
    day = "0" + day
  }

  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth
  }

  var date = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

  return (
        <Text style={styles.locationDate}>{day}.{currentMonth}.{year}-{days[date.getDay()]}</Text>
  )
}

const styles = StyleSheet.create({
    locationDate: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 2
      },
})

export default DateTime