import {FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class Utilities {
  static reloadComponent(router: {
    url: any;
    navigateByUrl: (arg0: string, arg1: { skipLocationChange: boolean; }) => Promise<any>;
    navigate: (arg0: string[]) => Promise<any>;
  }) {
    const url = router.url;
    router.navigateByUrl('/app', {skipLocationChange: true}).then(() => {
      router.navigate([`/${url}`]).then(() => {
      })
    })
  }

  static inputValidationCheck(property: string) {

    const specialCharRegx = /^[a-zA-Z0-9][a-zA-Z0-9 `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const whiteSpaceRegx = /^\s+|\s+$/g;
    const arabicRegex = /[\u0600-\u06FF]/;

    const ERROR_STRING = 'invalid';
    const REQUIRED_ERROR_MSG = 'error.requiredMsg';
    const INVALID_ERROR_MSG = 'error.invalidMsg';

    const setControlErrors = (control: any, errorObject: any) => {
      control?.setErrors(errorObject);
    };

    return (group: FormGroup): ValidationErrors => {
      const control = group.controls[property];
      const inputText = control?.value;

      if (inputText == '') {
        setControlErrors(control, {[ERROR_STRING]: REQUIRED_ERROR_MSG});
      } else if (arabicRegex.test(inputText)) {
        control.setErrors(null);
      } else if (inputText == ' ' || !specialCharRegx.test(inputText) || whiteSpaceRegx.test(inputText)) {
        setControlErrors(control, {[ERROR_STRING]: INVALID_ERROR_MSG});
      } else {
        control.setErrors(null);
      }
      // @ts-ignore
      return;
    }
  }

  static removeNUllProps(form: any) {
    Object.keys(form.value).forEach((key) => (form[key] == null) && delete form[key]);
  }
}
