# Internationalization (i18n)

## Types of i18n in CiviForm

There are two different cases where we require internationalization of strings - they are unrelated and require separate processes.

1. Internationalization for **Application Strings**
2. Internationalization for **Programs & Questions** (admin-configured)

## Internationalization for Application Strings

This refers to localizing hardcoded strings in the application itself, such as button text, page titles, and validation messages. These strings are known at compile time.

Application strings are used throughout CiviForm source code, and are configured following the [Play framework's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N). 

Note that the admin views only contain text in CiviForm's default language, whereas applicant views must be localized. Whenever you add hardcoded text to a view, you need to add translations for the text in the `messages` file:

1. Add the default string to [`messages`](https://github.com/civiform/civiform/blob/main/server/conf/i18n/messages), along with a comment providing context for how the text is used
2. Do not touch the other `messages.xx` files, such as `messages.tl`. Transifex will update these files automatically when translations are available. For now, all foreign languages will fall back to English strings.
3. Add the key from the messages file to [MessageKey.java](https://github.com/civiform/civiform/blob/main/server/app/services/MessageKey.java)
4. Use the message in the appropriate view, by calling `messages.at(MessageKey.NEW_KEY_NAME.getKeyName())`

Whether you need to wait for translations to be merged by Transifex before launching your feature depends on the context of the feature; use your best judgement or ask the team.

If you do need to wait for Transifex to merge translations, you have two options:

1.  Leave your PR outstanding until they are available. Merge your changes to `messages` in a new PR and wait for Transifex to merge translations. You'll eventually have to get your code synced to main, potentially with merge conflicts, before you can merge. 
2. Add a [FeatureFlag](feature-flags.md) around the code that adds your new text, and have it disabled until the translations are available.  In this way your future code changes are conditioned on the feature flag.  You can then choose to enable it in `application.dev-browser-tests.conf`, and check in any image diffs.

**NOTE: The apostrophe (') is used as an escape character in messages files.** If you want to have an apostrophe in a message, you need to escape it with another apostrophe. Example: to produce `can't`, write `can''t` in the messages files. More information on apostrophes can be found in [Play's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N#Notes-on-apostrophes)

## Internationalization for Programs & Questions (admin-configured)

This refers to the CiviForm Admin using the admin UI to localize strings they have provided, such as question text or program information. These strings are not known at compile time, but are instead added through the UI and stored in the CiviForm database.
 
The CiviForm Admin must provide translations for program forms themselves. This is accomplished through the "Manage Translations" UI when editing programs or questions.

![Admin translations](<../../.gitbook/assets/admin-translations.png>)

## Adding a new supported language

The Play framework supports internationalization with only a few steps required. If you would like CiviForm to support a new language, please do the following:

1. Look up the language code for the new language. We use Java's [Locale](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Locale.html) class, which uses the IANA Language Subtag Registry. You can search the [list of valid language subtags](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) to find the correct one (hint: look for "Type: language").
2. Add the language tag to list in [application.conf](https://github.com/civiform/civiform/blob/main/server/conf/application.conf) (under `play.i18n`). **IMPORTANT** - the first language code is considered the default for the application, so do not insert at the beginning. Instead, we keep the list ordered alphabetically by the English name of the language (ex: "Chinese" comes before "Korean", even though the language code for Chinese is "zh-TW").
3. Add a new messages file under [/conf](https://github.com/civiform/civiform/tree/main/server/conf) (see [messages.en-US](https://github.com/civiform/civiform/blob/main/server/conf/messages.en-US) for an example). Note that the file extension must match the language tag exactly. The file can be empty to start with. Merge it.
4. Add the language to the [Transifex project](https://app.transifex.com/civiform/). Wait for it to sync the default, English "translations" and approve the pull request that Transifex generates.

Need help? See [Play's i18n documentation](https://www.playframework.com/documentation/2.8.x/JavaI18N) for more guidance.

## Getting new translations

When someone merges a change to `messages` that introduces new strings, those strings will appear on the [Transifex project](https://app.transifex.com/civiform/). If you don't have access to Transifex, ask an Organization Administrator (Nick Burgan is one) to add you to the project, in a [role that makes sense for you](https://help.transifex.com/en/articles/6223416-understanding-user-roles)

When translations are available, anyone in a Translator role or higher can submit translations. Upon submission, immediately mark the translation as "Reviewed" in Transifex. We do not currently have a process for reviewing translations, but may do so in the future. Transifex will not open a Pull Request until the translation is marked as reviewed.

![Review translation](<../../.gitbook/assets/review-translation.png>)

If Transifex is not opening Pull Requests for some reason when it should, you can debug this by
initiating a manual sync:

![Integration settings](<../../.gitbook/assets/integration-settings.png>)

![Manual sync button](<../../.gitbook/assets/manual-sync-button.png>)

![Manual sync pane](<../../.gitbook/assets/sync-pane.png>)
