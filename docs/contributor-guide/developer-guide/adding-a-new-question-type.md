## 1. Add the new type and type definition
1. Add a new enum to [`QuestionType`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/question/types/QuestionType.java). Please maintain alphabetical ordering
1. Add a new question type definition class that extends [`QuestionDefinition`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/question/types/QuestionDefinition.java)
1. Add logic in [`QuestionDefinitionBuilder`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/question/types/QuestionDefinitionBuilder.java) to handle the new type

## 2. Implement additional validation or configuration logic
1. Implement a `MyTypeValidationPredicates` class on `MyTypeQuestionDefinition`
1. Add error messages to display to [`ValidationErrorMessages`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/applicant/ValidationErrorMessage.java)

## 3. Add rendering logic for applicant views
1. Add a new `MyTypeQuestion` class - use [`TextQuestion`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/applicant/question/TextQuestion.java) as an example
1. Update [`ApplicantQuestion`](https://github.com/seattle-uat/civiform/blob/main/server/app/services/applicant/question/ApplicantQuestion.java) to handle the new type
1. Add a new `MyTypeQuestionRenderer` that uses [j2Html](https://j2html.com/) to render the question. See [`TextQuestionRenderer`](https://github.com/seattle-uat/civiform/blob/main/server/app/views/questiontypes/TextQuestionRenderer.java) for an example
1. Update [`ApplicantQuestionRendererFactory`](https://github.com/seattle-uat/civiform/blob/main/server/app/views/questiontypes/ApplicantQuestionRendererFactory.java) to handle the new type and delegate to the new renderer
1. Check for validation errors and display them
    1. Update `MyTypeQuestion` to check for errors
    1. Add field errors to `MyTypeQuestionRenderer`

## 4. Add question form for applicant submission

1. Add a new `MyTypeQuestionForm` class - see [`TextQuestionForm`](https://github.com/seattle-uat/civiform/blob/main/server/app/forms/TextQuestionForm.java) as an example
1. Update [`QuestionFormBuilder`](https://github.com/seattle-uat/civiform/blob/main/server/app/forms/QuestionFormBuilder.java) to create the right form by question type

## 5. Allow the admin to create questions of this new type
1. Update [`QuestionConfig`](https://github.com/seattle-uat/civiform/blob/main/server/app/views/admin/questions/QuestionConfig.java) to handle the new type. If the new question type has custom validation or configuration options, add logic for rendering those inputs here.
1. Select an appropriate icon for this question type from [Heroicons](https://heroicons.com/). Copy the SVG code for the desired icon and use it in [`Icons`](https://github.com/seattle-uat/civiform/blob/main/server/app/views/components/Icons.java) for your new type

## 5. Test!
1. Add unit tests for the new types
1. Run the app locally and test the following:
    1. Admin flow
        1. Can you add a new question of this type?
        1. Can you edit the question?
        1. Does the icon look as intended?
    1. Applicant flow
        1. Can you fill out the question?
        1. Do error messages render correctly
1. Add a helper function in the browser tests for the new question type: [`admin_question.ts`](https://github.com/seattle-uat/civiform/blob/main/browser-test/src/support/admin_questions.ts) and [`applicant_questions.ts`](https://github.com/seattle-uat/civiform/blob/main/browser-test/src/support/applicant_questions.ts)
1. Add a focused browser test for the new question type: e.g. [`checkbox.test.ts`](https://github.com/seattle-uat/civiform/blob/main/browser-test/src/checkbox_test.ts)
