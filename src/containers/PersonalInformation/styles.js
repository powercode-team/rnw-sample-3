import { StyleSheet } from 'react-native';

import { colors } from '../../constants/style';
import { isWeb } from '../../utils/platform';
import fontNames from '../../constants/fontNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  wrapper: {
    flexDirection: isWeb ? 'row' : 'column',
    justifyContent: isWeb ? 'center' : 'flex-start',
    paddingVertical: isWeb ? 50 : 20,
    paddingHorizontal: 20,

    maxWidth: isWeb ? 500 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  block: {
    paddingHorizontal: isWeb ? 50 : 0,
    alignSelf: 'stretch',
  },
  input: {
    marginTop: 20,
  },
  dateText: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 22,
    fontFamily: fontNames.HKGrotesk.regular,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
    maxWidth: 510,
  },
});

export default styles;
