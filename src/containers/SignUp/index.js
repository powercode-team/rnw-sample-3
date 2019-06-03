import React, { Component } from 'react';
import propTypes from 'prop-types';
import { ScrollView, View, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { signUpAction } from '../../store/actions';

import Header from '../../components/Header';
import Card from '../../components/Card';
import InputField from '../../components/InputField';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';

import { SIGN_UP } from '../../utils/validation/formNames';
import validate from '../../utils/validation';
import validateWithError from '../../utils/validation/validateWithErrors';

import styles from './styles';

class SignUp extends Component {
  static propTypes = {
    history: propTypes.object.isRequired,
    signUp: propTypes.func.isRequired,
  };

  state = {
    firstName: '',
    firstNameErr: false,

    lastName: '',
    lastNameErr: false,

    password: '',
    passwordErr: false,

    confirmPassword: '',
    confirmPasswordErr: false,

    isCheckedTermsAndPrivacy: false,
    isCheckedTermsAndPrivacyErr: false,

    isSmallScreen: Dimensions.get('window').width < 1024,

    isLoading: false,
  };

  componentDidMount() {
    Dimensions.addEventListener('change', ({ window }) => this.setScreenSize(window.width));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setScreenSize);
  }

  setScreenSize = width => {
    this.setState({ isSmallScreen: width < 1024 });
  };

  toggleTermsAndPrivacy = () => {
    this.setState(prevState => {
      if (prevState.isCheckedTermsAndPrivacyErr) {
        return {
          isCheckedTermsAndPrivacy: !prevState.isCheckedTermsAndPrivacy,
          isCheckedTermsAndPrivacyErr: false,
        };
      }
      return { isCheckedTermsAndPrivacy: !prevState.isCheckedTermsAndPrivacy };
    });
  };

  checkboxLabel = () => (
    <Text style={styles.checkboxLabelText}>
      I have reviewed and agree to the{' '}
      <Text style={styles.checkboxLabelLinkText} onPress={this.gotToPlatformTerms}>
        Platform Terms
      </Text>{' '}
      and{' '}
      <Text style={styles.checkboxLabelLinkText} onPress={this.gotToPlatformTerms}>
        Privacy Policy
      </Text>
    </Text>
  );

  gotToPlatformTerms = () => {
    console.log('gotToPlatformTerms');
  };

  gotToPrivacyPolicy = () => {
    console.log('gotToPrivacyPolicy');
  };

  submit = () => {
    if (this.validation()) {
      this.setState({ isLoading: true });
      const { firstName, lastName, password } = this.state;
      this.props.signUp(firstName, lastName, password, () => {
        this.setState({ isLoading: false });
        this.props.history.push('/personal-information');
      });
    }
  };

  onTextValueChange = (name, value) => {
    this.setState(prevState => {
      const errName = `${name}Err`;
      if (prevState[errName]) {
        return { [name]: value, [errName]: false };
      }
      return { [name]: value };
    });
  };

  validateFormFiled = (fieldName, value) => validate(SIGN_UP, fieldName, value);

  validateFormFieldWithError = (fieldName, value) => validateWithError(SIGN_UP, fieldName, value);

  validation = () => {
    let valid = true;
    let errors = {};
    const { firstName, lastName, password, confirmPassword, isCheckedTermsAndPrivacy } = this.state;

    const firstNameErr = this.validateFormFiled('firstName', firstName);
    const lastNameErr = this.validateFormFiled('lastName', lastName);
    const passwordErr = this.validateFormFieldWithError('password', password);

    if (firstNameErr || lastNameErr || passwordErr) {
      valid = false;
      errors = { ...errors, firstNameErr, lastNameErr, passwordErr };
    }

    if (password.length && password !== confirmPassword) {
      valid = false;
      errors = { ...errors, confirmPasswordErr: 'Passwords do not match' };
    }

    if (!isCheckedTermsAndPrivacy) {
      valid = false;
      errors = { ...errors, isCheckedTermsAndPrivacyErr: true };
    }

    if (!valid) {
      this.setState(errors);
    }

    return valid;
  };

  render() {
    const {
      isSmallScreen,
      firstName,
      firstNameErr,
      lastName,
      lastNameErr,
      password,
      passwordErr,
      confirmPassword,
      confirmPasswordErr,
      isCheckedTermsAndPrivacy,
      isCheckedTermsAndPrivacyErr,
      isLoading,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Sign Up" />
        <ScrollView
          contentContainerStyle={[
            styles.wrapper,
            { flexDirection: isSmallScreen ? 'column' : 'row' },
          ]}
        >
          <View
            style={[
              styles.block,
              { minWidth: isSmallScreen ? 'auto' : 650, paddingHorizontal: isSmallScreen ? 0 : 50 },
            ]}
          >
            <Card style={styles.card}>
              <View style={styles.wrapperNameFields}>
                <InputField
                  value={firstName}
                  onChangeText={value => this.onTextValueChange('firstName', value)}
                  error={firstNameErr}
                  placeholder="First Name(s)"
                  style={styles.input}
                />
                <InputField
                  value={lastName}
                  onChangeText={value => this.onTextValueChange('lastName', value)}
                  error={lastNameErr}
                  placeholder="Last Name"
                  style={styles.input}
                />
              </View>
              <InputField
                value={password}
                onChangeText={value => this.onTextValueChange('password', value)}
                error={passwordErr}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
              <InputField
                value={confirmPassword}
                onChangeText={value => this.onTextValueChange('confirmPassword', value)}
                error={confirmPasswordErr}
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry
              />

              <Checkbox
                isChecked={isCheckedTermsAndPrivacy}
                onPress={this.toggleTermsAndPrivacy}
                label={this.checkboxLabel()}
              />

              {isCheckedTermsAndPrivacyErr && (
                <Text style={styles.errorMsg}>Please confirm terms and conditions</Text>
              )}
            </Card>
            <Button
              text="next"
              handler={this.submit}
              containerStyles={styles.button}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = {
  signUp: signUpAction,
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
