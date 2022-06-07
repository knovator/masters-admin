/* eslint-disable unicorn/better-regex */
const API_RESPONSE_LOGIN = "LOGIN"
const DEFAULT_NEXT_API_HEADER = { "Content-Type": "application/json" }
const API_SUCCESS_RESPONSE = "SUCCESS"
const GOOGLE_AUTH = "GOOGLE_AUTH"
const LOGIN_VIA_OTP = "LOGIN_VIA_OTP"
const NUMBER_OF_DIGITS_IN_OTP = 6
const OTP_VERIFY_CODE = "OTP_VERIFIED"
const ERROR_API_RESPONSE = "error"
const LICENSE_TYPE = "LICENSE_TYPE"
const VALIDATION_REQUIRED = true
const TYPE = "type"
const NAME = "name"
const IDENTIFIER = "identifier"
const IDENTIFIER_MAX_LENGTH = 6
const COMMON_NOT_REQUIRED_FIELD = undefined
const DEFAULT_NOT_REQUIRED = false
const ALPHANUMERIC_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/
const VALIDATE_TILL = "validateTill"
const DEFAULT_OFFSET_PAYLOAD = 0
const DEFAULT_LIMIT = 20
const DEFAULT_SORT = 1
const PAGE_LIMIT = [10, 20, 30, 40, 50]
const DECIMAL_REDIX = 10
const DEFAULT_CURRENT_PAGE = 1

const LOCATION = "location"
const EXPERIENCE = "experience"
const SKILLS = "skills"
const APPLIEDCANDIDATE = "appliedCandidate"

const KEYS = {
  user: "USER",
  authToken: "AUTH_TOKEN",
  tempData: "TEMP_DATA",
  companyData: "COMPANY_DATA",
  deviceId: "x-device-id",
  email: "email",
  adminPermission: "ADMIN_PERMISSION",
  userId: "USER_ID",
  appointmentId: "APPOINTMENT_ID",
  rememberMe: "REMEMBER_ME",
  checkinMessage: "CHECKIN_MESSAGE",
  tempToken: "TEMP_TOKEN",
  token: "Token",
}

export {
  API_RESPONSE_LOGIN,
  DEFAULT_NEXT_API_HEADER,
  API_SUCCESS_RESPONSE,
  GOOGLE_AUTH,
  LOGIN_VIA_OTP,
  NUMBER_OF_DIGITS_IN_OTP,
  OTP_VERIFY_CODE,
  ERROR_API_RESPONSE,
  LICENSE_TYPE,
  VALIDATION_REQUIRED,
  TYPE,
  NAME,
  IDENTIFIER,
  IDENTIFIER_MAX_LENGTH,
  COMMON_NOT_REQUIRED_FIELD,
  DEFAULT_NOT_REQUIRED,
  ALPHANUMERIC_REGEX,
  VALIDATE_TILL,
  KEYS,
  DEFAULT_OFFSET_PAYLOAD,
  DEFAULT_LIMIT,
  DEFAULT_SORT,
  PAGE_LIMIT,
  DECIMAL_REDIX,
  DEFAULT_CURRENT_PAGE,
  LOCATION,
  EXPERIENCE,
  SKILLS,
  APPLIEDCANDIDATE,
}
