# Internationalization (i18n)

# Types of i18n in CiviForm

There are two different cases where we require internationalization of strings - they are unrelated and require separate processes. 

1. i18n for **application strings** - this refers to localizing hardcoded strings in the application itself, such as button text, page titles, and validation messages. These strings are known at compile time.
2. i18n for **admin-configured forms** - this refers to the CiviForm admin using the admin UI to localize strings they have provided, such as question text or program information. These strings are not known at compile time, but are instead added through the UI and stored in the CiviForm database.

# i18n for application strings

Application strings are used in [views](https://github.com/seattle-uat/civiform/tree/main/universal-application-tool-0.0.1/app/views) and are configured following the [Play framework's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N). Note that the admin views only contain text in CiviForm's default language, whereas applicant views must be localized. Whenever you add hardcoded text to a view, you need to add translations for the text in the `messages` file(s):

1. Add the default string to [messages](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/conf/messages), along with a comment providing context for how the text is used
2. If you have translations available, add them to the language-specific [messages files](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/conf)
3. Add the key from the messages file to [MessageKey.java](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/app/services/MessageKey.java)
4. Use the message in the appropriate view, by calling `messages.at(MessageKey.NEW_KEY_NAME.getKeyName())`

**NOTE: The apostrophe (') is used as an escape character in messages files.** If you want to have an apostrophe in a message, you need to escape it with another apostrophe. Example: to produce `can't`, write `can''t` in the messages files. More information on apostrophes can be found in [Play's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N#Notes-on-apostrophes)

# i18n for admin-configured forms

The CiviForm admin must provide translations for program forms themselves. This is accomplished through the "Manage Translations" UI when editing programs or questions. 

# Adding a new supported language

The Play framework supports internationalization with only a few steps required. If you would like CiviForm to support a new language, please do the following:

1. Look up the language code for the new language. We use Java's [Locale](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html) class, which uses the IANA Language Subtag Registry. You can search the [list of valid language subtags](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) to find the correct one (hint: look for "Type: language").
1. Add the language tag to list in [application.conf](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/conf/application.conf) (under `play.i18n`). **IMPORTANT** - the first language code is considered the default for the application, so do not insert at the beginning. Instead, we keep the list ordered alphabetically by the English name of the language (ex: "Chinese" comes before "Korean", even though the language code for Chinese is "zh-TW").
1. Add a new messages file under [/conf](https://github.com/seattle-uat/civiform/tree/main/universal-application-tool-0.0.1/conf) (see [messages.en-US](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/conf/messages.en-US) for an example). Note that the file extension must match the language tag exactly.
1. Update the [ApplicantInformationControllerTest](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/test/controllers/applicant/ApplicantInformationControllerTest.java) `edit_usesHumanReadableLanguagesInsteadOfIsoTags` to include a check for the new language.
1. Add translations to the new messages file for the language, and run the application to verify the new translations appear.

Need help? See [Play's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N) for more guidance.
