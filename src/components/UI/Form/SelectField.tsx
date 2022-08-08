import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Select, SlectFieldProps } from "./Select";

export type RhfdSelectProps<T extends FieldValues> = SlectFieldProps &
  UseControllerProps<T>;

export const SelectField = <T extends FieldValues>(
  props: RhfdSelectProps<T>
) => {
  const { name, control, label, items } = props;
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController({ name, control });
  return (
    <Select
      label={label}
      items={items}
      {...rest}
      error={
        errors[name] &&
        `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`
      }
    />
  );
};
