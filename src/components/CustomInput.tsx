import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

interface CustomInputProps extends TextInputProps {
  name: string;
  rules?: RegisterOptions;
  containerStyle?: any;
}

export default function CustomInput({
  name,
  rules = {},
  containerStyle,
  ...props
}: CustomInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <View style={[styles.container, containerStyle]}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors[name]
                    ? colors.light.error
                    : colors.light.gray,
                },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={colors.light.gray}
              {...props}
            />

            {errors[name] && (
              <Text style={styles.text}>{String(errors[name]?.message)}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: colors.light.gray,
    padding: 12,
    borderRadius: 8,
    color: colors.light.text,
  },
  text: { color: colors.light.error, marginTop: 5 },
});
