import { FieldService } from "./field-service";
import { makeAutoObservable } from "mobx";
import { IField, ValueType } from "./types";

export class AutocompleteFieldService<T = ValueType<unknown>> implements IField {
  field = new FieldService<T>(null);
  inputField = new FieldService<string>("");
  
  constructor(initValue?: ValueType<T>) {
    makeAutoObservable(this);

    this.field.initValue = initValue;
  }

  get validate() {
    return this.field.validate;
  }

  set validate(validate: (() => Promise<void>) | undefined) {
    this.field.validate = validate;
  }

  setValue = (value: ValueType<T>, { inputValue = "", withNotification = true, withBlur = true }) => {
    if(!withNotification) {
      this.field.pauseListener();
      this.inputField.pauseListener();

      this.field.value = value;
      this.inputField.value = inputValue;

      this.field.validate?.();
      this.inputField.validate?.();

      this.field.resumeListener();
      this.inputField.resumeListener();
    }
    else {
      this.field.value= value;
      this.inputField.value = inputValue;
    }

    if(withBlur) {
      return this.field.isBlurred = true;
    }
  }

  reset =() => {
    this.field.reset();
  }
  setAsInit = () => {
    this.field.setAsInit();
  }

  onInputChange = (e: any, value: string) => {
    this.inputField.value = value;
  }

  touch = () => {
    this.field.touch();
  }

  get value() {
    return this.field.value;
  }

  set value(value: ValueType<T>) {
    this.field.value = value;
  }

  get error() {
    return this.field.error;
  }

  set error(error: string | undefined) {
    this.field.error = error;
  }

  get disabled() {
    return this.field.disabled;
  }

  set disabled(disabled: boolean) {
    this.field.disabled = disabled;
  }

  get isValid() {
    return this.field.isValid;
  }

  get isInit() {
    return this.field.isInit;
  }

  set initValue(initValue: ValueType<T>) {
    this.field.initValue = initValue;
  }

  get isTouched() {
    return this.field.isTouched;
  }

  get initValue() {
    return this.field.initValue;
  }

  get props() {
    return {
      ...this.field.props,
      inputValue: this.inputField.value,
      onInputChange: this.onInputChange
    };
  }
}