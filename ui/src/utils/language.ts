export enum STRING {
  /* BUTTON */
  BACK,
  CANCEL,
  CURRENT_LOCATION,
  EDIT,
  NEXT,
  REFRESH,
  RESET,
  SAVE,
  SEARCH_MAP,

  /* DIALOG */
  DIALOG_DEPLOYMENT_DETAILS,
  DIALOG_EDIT_DEPLOYMENT,
  DIALOG_NEW_DEPLOYMENT,

  /* FIELD_LABEL */
  FIELD_LABEL_AVG_TEMP,
  FIELD_LABEL_CAPTURES,
  FIELD_LABEL_CONNECTION_STATUS,
  FIELD_LABEL_DATE,
  FIELD_LABEL_DEPLOYMENT,
  FIELD_LABEL_DESCRIPTION,
  FIELD_LABEL_DETECTIONS,
  FIELD_LABEL_DURATION,
  FIELD_LABEL_EXAMPLE_CAPTURES,
  FIELD_LABEL_GENERAL,
  FIELD_LABEL_ID,
  FIELD_LABEL_LATITUDE,
  FIELD_LABEL_LOCATION,
  FIELD_LABEL_LONGITUDE,
  FIELD_LABEL_MOST_RECENT,
  FIELD_LABEL_NAME,
  FIELD_LABEL_OCCURRENCES,
  FIELD_LABEL_PATH,
  FIELD_LABEL_PROJECT,
  FIELD_LABEL_SESSION,
  FIELD_LABEL_SESSIONS,
  FIELD_LABEL_SOURCE_IMAGES,
  FIELD_LABEL_SPECIES,
  FIELD_LABEL_STATUS,
  FIELD_LABEL_TIME,
  FIELD_LABEL_TRAINING_IMAGES,
  FIELD_LABEL_FIRST_DATE,
  FIELD_LABEL_LAST_DATE,

  /* MESSAGE */
  MESSAGE_IMAGE_TOO_BIG,
  MESSAGE_VALUE_INVALID,
  MESSAGE_VALUE_MISSING,
  MESSAGE_NO_RESULTS,

  /* NAV_ITEM */
  NAV_ITEM_DEPLOYMENTS,
  NAV_ITEM_JOBS,
  NAV_ITEM_OCCURRENCES,
  NAV_ITEM_OVERVIEW,
  NAV_ITEM_PROJECTS,
  NAV_ITEM_SESSIONS,
  NAV_ITEM_SPECIES,

  /* TAB_ITEM */
  TAB_ITEM_CLASSIFICATION,
  TAB_ITEM_FIELDS,
  TAB_ITEM_GALLERY,
  TAB_ITEM_TABLE,

  /* OTHER */
  CLOSE,
  CONNECTED,
  CONNECTING,
  DONE,
  LAST_UPDATED,
  LOADING_DATA,
  NOT_CONNECTED,
  PENDING,
  RUNNING,
  SELECT_COLUMNS,
  UNKNOWN,
  UPDATING_DATA,
}

const ENGLISH_STRINGS: { [key in STRING]: string } = {
  /* BUTTON */
  [STRING.BACK]: 'Back',
  [STRING.CANCEL]: 'Cancel',
  [STRING.CURRENT_LOCATION]: 'Use current location',
  [STRING.EDIT]: 'Edit',
  [STRING.NEXT]: 'Next',
  [STRING.REFRESH]: 'Refresh',
  [STRING.RESET]: 'Reset',
  [STRING.SAVE]: 'Save',
  [STRING.SEARCH_MAP]: 'Search on the map',

  /* DIALOG */
  [STRING.DIALOG_DEPLOYMENT_DETAILS]: 'Deployment details',
  [STRING.DIALOG_EDIT_DEPLOYMENT]: 'Edit deployment',
  [STRING.DIALOG_NEW_DEPLOYMENT]: 'Register new deployment',

  /* FIELD_LABEL */
  [STRING.FIELD_LABEL_AVG_TEMP]: 'Avg temp',
  [STRING.FIELD_LABEL_CAPTURES]: 'Captures',
  [STRING.FIELD_LABEL_CONNECTION_STATUS]: 'Connection status',
  [STRING.FIELD_LABEL_DATE]: 'Date',
  [STRING.FIELD_LABEL_DEPLOYMENT]: 'Deployment',
  [STRING.FIELD_LABEL_DESCRIPTION]: 'Description',
  [STRING.FIELD_LABEL_DETECTIONS]: 'Detection(s)',
  [STRING.FIELD_LABEL_DURATION]: 'Duration',
  [STRING.FIELD_LABEL_EXAMPLE_CAPTURES]: 'Example captures',
  [STRING.FIELD_LABEL_GENERAL]: 'General',
  [STRING.FIELD_LABEL_ID]: 'ID',
  [STRING.FIELD_LABEL_LATITUDE]: 'Latitude',
  [STRING.FIELD_LABEL_LOCATION]: 'Location',
  [STRING.FIELD_LABEL_LONGITUDE]: 'Longitude',
  [STRING.FIELD_LABEL_MOST_RECENT]: 'Most recent',
  [STRING.FIELD_LABEL_NAME]: 'Name',
  [STRING.FIELD_LABEL_OCCURRENCES]: 'Occurrences',
  [STRING.FIELD_LABEL_PATH]: 'Path',
  [STRING.FIELD_LABEL_PROJECT]: 'Project',
  [STRING.FIELD_LABEL_SESSION]: 'Session',
  [STRING.FIELD_LABEL_SESSIONS]: 'Sessions',
  [STRING.FIELD_LABEL_SOURCE_IMAGES]: 'Source images',
  [STRING.FIELD_LABEL_SPECIES]: 'Species',
  [STRING.FIELD_LABEL_STATUS]: 'Status',
  [STRING.FIELD_LABEL_TIME]: 'Time',
  [STRING.FIELD_LABEL_TRAINING_IMAGES]: 'Training images',
  [STRING.FIELD_LABEL_FIRST_DATE]: 'First date',
  [STRING.FIELD_LABEL_LAST_DATE]: 'Last date',

  /* MESSAGE */
  [STRING.MESSAGE_IMAGE_TOO_BIG]: 'Please provide a smaller image',
  [STRING.MESSAGE_VALUE_INVALID]: 'Please provide a valid value',
  [STRING.MESSAGE_VALUE_MISSING]: 'Please provide a value',
  [STRING.MESSAGE_NO_RESULTS]: 'No results to show',

  /* NAV_ITEM */
  [STRING.NAV_ITEM_DEPLOYMENTS]: 'Deployments',
  [STRING.NAV_ITEM_JOBS]: 'Status',
  [STRING.NAV_ITEM_OCCURRENCES]: 'Occurrences',
  [STRING.NAV_ITEM_OVERVIEW]: 'Overview',
  [STRING.NAV_ITEM_PROJECTS]: 'Projects',
  [STRING.NAV_ITEM_SESSIONS]: 'Sessions',
  [STRING.NAV_ITEM_SPECIES]: 'Species',

  /* TAB_ITEM */
  [STRING.TAB_ITEM_CLASSIFICATION]: 'Classification',
  [STRING.TAB_ITEM_FIELDS]: 'Fields',
  [STRING.TAB_ITEM_GALLERY]: 'Gallery',
  [STRING.TAB_ITEM_TABLE]: 'Table',

  /* OTHER */
  [STRING.CLOSE]: 'Close',
  [STRING.CONNECTED]: 'Connected',
  [STRING.CONNECTING]: 'Connecting',
  [STRING.DONE]: 'Done',
  [STRING.LAST_UPDATED]: 'Last updated',
  [STRING.LOADING_DATA]: 'Loading data',
  [STRING.NOT_CONNECTED]: 'Not connected',
  [STRING.PENDING]: 'Pending',
  [STRING.RUNNING]: 'Running',
  [STRING.SELECT_COLUMNS]: 'Select columns',
  [STRING.UNKNOWN]: 'Unknown',
  [STRING.UPDATING_DATA]: 'Updating data',
}

// When we have more translations available, this function could return a value based on current language settings.
export const translate = (key: STRING): string => {
  return ENGLISH_STRINGS[key]
}
