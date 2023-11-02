export enum STRING {
  /* BUTTON */
  AGREE,
  AGREED,
  BACK,
  CANCEL,
  CHANGE_IMAGE,
  CHOOSE_IMAGE,
  CLEAR,
  CURRENT_LOCATION,
  DELETE,
  DELETED,
  EDIT,
  NEXT,
  LOGIN,
  LOGOUT,
  REFRESH,
  RESET,
  RETRY,
  SAVE,
  SAVED,
  SEARCH_MAP,
  SIGN_UP,
  SUBMIT,
  SUGGEST_ID,
  VIEW_PUBLIC_PROJECTS,

  /* ENTITY */
  ENTITY_CREATE,
  ENTITY_DELETE,
  ENTITY_DETAILS,
  ENTITY_EDIT,
  ENTITY_TYPE_CAPTURE,
  ENTITY_TYPE_DEPLOYMENT,
  ENTITY_TYPE_IDENTIFICATION,
  ENTITY_TYPE_JOB,
  ENTITY_TYPE_PROJECT,
  ENTITY_VIEW,

  /* FIELD_LABEL */
  FIELD_LABEL_AVG_TEMP,
  FIELD_LABEL_CAPTURES,
  FIELD_LABEL_COMMENT,
  FIELD_LABEL_CONNECTION_STATUS,
  FIELD_LABEL_CREATED_AT,
  FIELD_LABEL_DATE,
  FIELD_LABEL_DELAY,
  FIELD_LABEL_DEPLOYMENT,
  FIELD_LABEL_DESCRIPTION,
  FIELD_LABEL_DETECTIONS,
  FIELD_LABEL_DURATION,
  FIELD_LABEL_EMAIL,
  FIELD_LABEL_GENERAL,
  FIELD_LABEL_ID,
  FIELD_LABEL_IMAGE,
  FIELD_LABEL_LATITUDE,
  FIELD_LABEL_LOCATION,
  FIELD_LABEL_LONGITUDE,
  FIELD_LABEL_MOST_RECENT,
  FIELD_LABEL_NAME,
  FIELD_LABEL_OCCURRENCES,
  FIELD_LABEL_PASSWORD,
  FIELD_LABEL_PATH,
  FIELD_LABEL_PROJECT,
  FIELD_LABEL_SAMPLING_METHOD,
  FIELD_LABEL_SESSION,
  FIELD_LABEL_SESSIONS,
  FIELD_LABEL_SOURCE_IMAGES,
  FIELD_LABEL_SPECIES,
  FIELD_LABEL_STATUS,
  FIELD_LABEL_TAXON,
  FIELD_LABEL_THUMBNAIL,
  FIELD_LABEL_TIME,
  FIELD_LABEL_TIMESTAMP,
  FIELD_LABEL_TRAINING_IMAGES,
  FIELD_LABEL_FIRST_DATE,
  FIELD_LABEL_LAST_DATE,
  FIELD_LABEL_UPDATED_AT,
  FIELD_LABEL_UPLOADED_CAPTURES,

  /* MESSAGE */
  MESSAGE_CAPTURE_FILENAME,
  MESSAGE_CAPTURE_LIMIT,
  MESSAGE_CAPTURE_TOO_MANY,
  MESSAGE_CAPTURE_UPLOAD_HIDDEN,
  MESSAGE_CHANGE_PASSWORD,
  MESSAGE_COULD_NOT_SAVE,
  MESSAGE_DELETE_CONFIRM,
  MESSAGE_HAS_ACCOUNT,
  MESSAGE_IMAGE_FORMAT,
  MESSAGE_IMAGE_SIZE,
  MESSAGE_IMAGE_TOO_BIG,
  MESSAGE_NO_ACCOUNT_YET,
  MESSAGE_NO_IMAGE,
  MESSAGE_NO_RESULTS,
  MESSAGE_PASSWORD_FORMAT,
  MESSAGE_RESULT_RANGE,
  MESSAGE_SIGNED_UP,
  MESSAGE_VALUE_INVALID,
  MESSAGE_VALUE_MISSING,

  /* NAV_ITEM */
  NAV_ITEM_DEPLOYMENTS,
  NAV_ITEM_JOBS,
  NAV_ITEM_OCCURRENCES,
  NAV_ITEM_OVERVIEW,
  NAV_ITEM_PROJECTS,
  NAV_ITEM_SESSIONS,
  NAV_ITEM_SPECIES,

  /* TAB_ITEM */
  TAB_ITEM_COLLECTIONS,
  TAB_ITEM_FIELDS,
  TAB_ITEM_GALLERY,
  TAB_ITEM_IDENTIFICATION,
  TAB_ITEM_SUMMARY,
  TAB_ITEM_TABLE,

  /* OTHER */
  CLOSE,
  CONNECTED,
  CONNECTING,
  DONE,
  ID_APPLIED,
  LAST_UPDATED,
  LOADING_DATA,
  MACHINE_PREDICTION_SCORE,
  MACHINE_SUGGESTION,
  NEW_ID,
  NOT_CONNECTED,
  OR,
  PENDING,
  RUNNING,
  SELECT_COLUMNS,
  UNKNOWN,
  UPDATING_DATA,
  USER_INFO,
  VERIFIED_BY,
}

const ENGLISH_STRINGS: { [key in STRING]: string } = {
  /* BUTTON */
  [STRING.AGREE]: 'Agree',
  [STRING.AGREED]: 'Agreed',
  [STRING.BACK]: 'Back',
  [STRING.DELETE]: 'Delete',
  [STRING.DELETED]: 'Deleted',
  [STRING.CANCEL]: 'Cancel',
  [STRING.CHANGE_IMAGE]: 'Change image',
  [STRING.CHOOSE_IMAGE]: 'Choose image',
  [STRING.CLEAR]: 'Clear',
  [STRING.CURRENT_LOCATION]: 'Use current location',
  [STRING.EDIT]: 'Edit',
  [STRING.LOGIN]: 'Login',
  [STRING.LOGOUT]: 'Logout',
  [STRING.NEXT]: 'Next',
  [STRING.REFRESH]: 'Refresh',
  [STRING.RESET]: 'Reset',
  [STRING.RETRY]: 'Retry',
  [STRING.SAVE]: 'Save',
  [STRING.SAVED]: 'Saved',
  [STRING.SEARCH_MAP]: 'Search on the map',
  [STRING.SIGN_UP]: 'Sign up',
  [STRING.SUBMIT]: 'Submit',
  [STRING.SUGGEST_ID]: 'Suggest ID',
  [STRING.VIEW_PUBLIC_PROJECTS]: 'View public projects',

  /* FIELD_LABEL */
  [STRING.FIELD_LABEL_AVG_TEMP]: 'Avg temp',
  [STRING.FIELD_LABEL_CAPTURES]: 'Captures',
  [STRING.FIELD_LABEL_COMMENT]: 'Comment',
  [STRING.FIELD_LABEL_CONNECTION_STATUS]: 'Connection status',
  [STRING.FIELD_LABEL_CREATED_AT]: 'Created at',
  [STRING.FIELD_LABEL_DATE]: 'Date',
  [STRING.FIELD_LABEL_DELAY]: 'Delay',
  [STRING.FIELD_LABEL_DEPLOYMENT]: 'Deployment',
  [STRING.FIELD_LABEL_DESCRIPTION]: 'Description',
  [STRING.FIELD_LABEL_DETECTIONS]: 'Detections',
  [STRING.FIELD_LABEL_DURATION]: 'Duration',
  [STRING.FIELD_LABEL_EMAIL]: 'Email',
  [STRING.FIELD_LABEL_GENERAL]: 'General',
  [STRING.FIELD_LABEL_ID]: 'ID',
  [STRING.FIELD_LABEL_IMAGE]: 'Image',
  [STRING.FIELD_LABEL_LATITUDE]: 'Latitude',
  [STRING.FIELD_LABEL_LOCATION]: 'Location',
  [STRING.FIELD_LABEL_LONGITUDE]: 'Longitude',
  [STRING.FIELD_LABEL_MOST_RECENT]: 'Most recent',
  [STRING.FIELD_LABEL_NAME]: 'Name',
  [STRING.FIELD_LABEL_OCCURRENCES]: 'Occurrences',
  [STRING.FIELD_LABEL_PASSWORD]: 'Password',
  [STRING.FIELD_LABEL_PATH]: 'Path',
  [STRING.FIELD_LABEL_PROJECT]: 'Project',
  [STRING.FIELD_LABEL_SAMPLING_METHOD]: 'Sampling method',
  [STRING.FIELD_LABEL_SESSION]: 'Session',
  [STRING.FIELD_LABEL_SESSIONS]: 'Sessions',
  [STRING.FIELD_LABEL_SOURCE_IMAGES]: 'Source images',
  [STRING.FIELD_LABEL_SPECIES]: 'Species',
  [STRING.FIELD_LABEL_STATUS]: 'Status',
  [STRING.FIELD_LABEL_TAXON]: 'Taxon',
  [STRING.FIELD_LABEL_THUMBNAIL]: 'Thumbnail',
  [STRING.FIELD_LABEL_TIME]: 'Time',
  [STRING.FIELD_LABEL_TIMESTAMP]: 'Timestamp',
  [STRING.FIELD_LABEL_TRAINING_IMAGES]: 'Training images',
  [STRING.FIELD_LABEL_FIRST_DATE]: 'First date',
  [STRING.FIELD_LABEL_LAST_DATE]: 'Last date',
  [STRING.FIELD_LABEL_UPDATED_AT]: 'Updated at',
  [STRING.FIELD_LABEL_UPLOADED_CAPTURES]: 'Manually uploaded captures',

  /* ENTITY */
  [STRING.ENTITY_CREATE]: 'Register new {{type}}',
  [STRING.ENTITY_DELETE]: 'Delete {{type}}',
  [STRING.ENTITY_DETAILS]: '{{type}} details',
  [STRING.ENTITY_EDIT]: 'Edit {{type}}',
  [STRING.ENTITY_TYPE_CAPTURE]: 'dapture',
  [STRING.ENTITY_TYPE_DEPLOYMENT]: 'deployment',
  [STRING.ENTITY_TYPE_IDENTIFICATION]: 'identification',
  [STRING.ENTITY_TYPE_JOB]: 'job',
  [STRING.ENTITY_TYPE_PROJECT]: 'project',
  [STRING.ENTITY_VIEW]: 'View {{type}}',

  /* MESSAGE */
  [STRING.MESSAGE_CAPTURE_FILENAME]:
    'Image filename must contain a timestamp in the format YYYYMMDDHHMMSS (e.g. 20210101120000-snapshot.jpg).',
  [STRING.MESSAGE_CAPTURE_LIMIT]:
    'A maximum of {{numCaptures}} captures can be uploaded.',
  [STRING.MESSAGE_CAPTURE_TOO_MANY]:
    'To upload more than {{numCaptures}} images you must configure a data source.',
  [STRING.MESSAGE_CAPTURE_UPLOAD_HIDDEN]:
    'Deployment must be saved before uploading captures.',
  [STRING.MESSAGE_CHANGE_PASSWORD]:
    'Contact an administrator to change your email or password.',
  [STRING.MESSAGE_COULD_NOT_SAVE]: 'Could not save',
  [STRING.MESSAGE_DELETE_CONFIRM]:
    'Are you sure you want to delete this {{type}}?',
  [STRING.MESSAGE_HAS_ACCOUNT]: 'Already have an account?',
  [STRING.MESSAGE_IMAGE_FORMAT]: 'Valid formats are PNG, GIF and JPEG.',
  [STRING.MESSAGE_IMAGE_SIZE]:
    'The image must smaller than {{value}} {{unit}}.',
  [STRING.MESSAGE_IMAGE_TOO_BIG]: 'Please provide a smaller image',
  [STRING.MESSAGE_NO_ACCOUNT_YET]: 'No account yet?',
  [STRING.MESSAGE_NO_IMAGE]: 'No image',
  [STRING.MESSAGE_NO_RESULTS]: 'No results to show',
  [STRING.MESSAGE_PASSWORD_FORMAT]:
    'The password must contain at least 8 characters and cannot be entirely numeric.',
  [STRING.MESSAGE_RESULT_RANGE]:
    'Showing {{start}}-{{end}} of {{total}} results',
  [STRING.MESSAGE_SIGNED_UP]: 'Signed up successfully!',
  [STRING.MESSAGE_VALUE_INVALID]: 'Please provide a valid value',
  [STRING.MESSAGE_VALUE_MISSING]: 'Please provide a value',

  /* NAV_ITEM */
  [STRING.NAV_ITEM_DEPLOYMENTS]: 'Deployments',
  [STRING.NAV_ITEM_JOBS]: 'Status',
  [STRING.NAV_ITEM_OCCURRENCES]: 'Occurrences',
  [STRING.NAV_ITEM_OVERVIEW]: 'Overview',
  [STRING.NAV_ITEM_PROJECTS]: 'Projects',
  [STRING.NAV_ITEM_SESSIONS]: 'Sessions',
  [STRING.NAV_ITEM_SPECIES]: 'Species',

  /* TAB_ITEM */
  [STRING.TAB_ITEM_COLLECTIONS]: 'Collections',
  [STRING.TAB_ITEM_FIELDS]: 'Fields',
  [STRING.TAB_ITEM_GALLERY]: 'Gallery',
  [STRING.TAB_ITEM_IDENTIFICATION]: 'Identification',
  [STRING.TAB_ITEM_TABLE]: 'Table',
  [STRING.TAB_ITEM_SUMMARY]: 'Summary',

  /* OTHER */
  [STRING.CLOSE]: 'Close',
  [STRING.CONNECTED]: 'Connected',
  [STRING.CONNECTING]: 'Connecting',
  [STRING.DONE]: 'Done',
  [STRING.ID_APPLIED]: 'ID applied',
  [STRING.LAST_UPDATED]: 'Last updated',
  [STRING.LOADING_DATA]: 'Loading data',
  [STRING.MACHINE_PREDICTION_SCORE]: 'Machine prediction\nscore {{score}}',
  [STRING.MACHINE_SUGGESTION]: 'Machine suggestion',
  [STRING.NEW_ID]: 'New ID',
  [STRING.NOT_CONNECTED]: 'Not connected',
  [STRING.OR]: 'Or',
  [STRING.PENDING]: 'Pending',
  [STRING.RUNNING]: 'Running',
  [STRING.SELECT_COLUMNS]: 'Select columns',
  [STRING.UNKNOWN]: 'Unknown',
  [STRING.UPDATING_DATA]: 'Updating data',
  [STRING.USER_INFO]: 'User info',
  [STRING.VERIFIED_BY]: 'Verified by\n{{name}}',
}

// When we have more translations available, this function could return a value based on current language settings.
export const translate = (
  key: STRING,
  values?: { [key: string]: string | number }
): string => {
  let string = ENGLISH_STRINGS[key]

  if (!values) {
    return string
  }

  Object.entries(values).forEach(([key, value]) => {
    string = string.replace(`{{${key}}}`, `${value}`)
  })

  return string
}
