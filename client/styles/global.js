import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 18,
    color: '#333'
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  input: {
    borderRadius: 6,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    margin: 5
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 3,
    textAlign: 'center'
  }
});
