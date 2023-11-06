
import { IValidation } from "../types";

export const requestValidation = async (validations: IValidation[]): Promise<string[]> => {
   let errors: string[] = [];
   for (const validation of validations) {
      const resultValidation = await doValidateRule(validation);
      if (resultValidation !== "") errors.push(resultValidation);
   }

   return errors;
}

const doValidateRule = async (request: IValidation): Promise<string> => {
   let check: boolean = false;
   switch (request.rule) {
      case 'required':
         check = await requiredRule(request.value);
         if (!check) return `${request.name} is required!`;
         break;
      case 'email':
         check = await emailRule(request.value);
         if (!check) return `${request.name} is not a valid email!`;
         break;
      case 'password':
         check = await passwordRule(request.value);
         if (!check) return `${request.name} must contain at least one lowercase character, one uppercase character, one digit, and one special character!`;
         break;
      default:
         return `${request.name} has an unknown validation rule: ${request.rule}`;
   }

   return '';
}

const requiredRule = async (value: any): Promise<boolean> => {
   return !!value;
}

const passwordRule = async (value: string): Promise<boolean> => {
   if (!value) return false;

   const hasLower = /[a-z]/.test(value);
   const hasUpper = /[A-Z]/.test(value);
   const hasDigit = /\d/.test(value);
   const hasSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

   if (hasLower && hasUpper && hasDigit && hasSpecial) {
      return true
   }
   return false;
}

const emailRule = async (value: string): Promise<boolean> => {
   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
   return emailRegex.test(value);
}