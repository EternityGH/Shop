import React, { useReducer, useEffect, useCallback } from 'react'
import {  
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    YellowBox,
    Alert } from 'react-native'
import { useSelector, useDispatch  } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};
const EditProductScreen = (props) => {

  const prodId = props.route.params?.productId;
  // const submitFN = props.route.params?.submit;

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  // useEffect(() => {
  //   props.navigation.setParams({ submit: submitHandler });
  // }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  props.navigation.setOptions({
    headerTitle: props.route.params?.productId
    ? 'Edit Product'
    : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitHandler}
        />
      </HeaderButtons>
    )
  });
  return (
  <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
              <Input
              id="title"
              label="Title"
              errorText="Please enter a valid title!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.title : ''}
              initiallyValid={!!editedProduct}
              required
            />
            <Input
              id="imageUrl"
              label="Image Url"
              errorText="Please enter a valid image url!"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.imageUrl : ''}
              initiallyValid={!!editedProduct}
              required
            />
            {editedProduct ? null : (
              <Input
                id="price"
                label="Price"
                errorText="Please enter a valid price!"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                required
                min={0.1}
              />
            )}
            <Input
              id="description"
              label="Description"
              errorText="Please enter a valid description!"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              multiline
              numberOfLines={3}
              onInputChange={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.description : ''}
              initiallyValid={!!editedProduct}
              required
              minLength={5}
            />
          </View>
        </View>
      </ScrollView>
      )
};

const styles = StyleSheet.create({
    form: {
      margin: 20
    },
  });
export default EditProductScreen;










import React, { useReducer, useEffect, useCallback } from 'react'
import {  
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    YellowBox,
    Alert } from 'react-native'
import { useSelector, useDispatch  } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';


YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProductScreen = (props) => {

  const prodId = props.route.params?.productId;
  const submitFN = props.route.params?.submit;

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    });
  };

  props.navigation.setOptions({
    headerTitle: 'Enter product',
    headerTitle: props.route.params?.productId
    ? 'Edit Product'
    : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFN}
        />
      </HeaderButtons>
    )
  });
  return (
  <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
               style={styles.input}
               value={formState.inputValues.title}
               onChangeText={textChangeHandler.bind(this, 'title')}
               keyboardType="default"
               autoCapitalize="sentences"
               autoCorrect
               returnKeyType="next"
               onEndEditing={() => console.log('onEndEditing')}
               onSubmitEditing={() => console.log('onSubmitEditing')}
            />
                      {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imageUrl}
              onChangeText={textChangeHandler.bind(this, 'imageUrl')}
            />
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                onChangeText={textChangeHandler.bind(this, 'price')}
                keyboardType="decimal-pad"
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, 'description')}
            />
          </View>
        </View>
      </ScrollView>
      )
};

const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    formControl: {
      width: '100%'
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }
  });
export default EditProductScreen;
